#!/usr/bin/env node

/**
 * Script to fix rider account - convert vendor to rider and create profile
 * Usage: node fix-rider-account.js <phone>
 */

require('dotenv').config();
const { User, Rider } = require('../models');

async function fixRiderAccount(phone) {
  try {
    console.log(`🔧 Fixing rider account for phone: ${phone}\n`);
    
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      console.log(`❌ User not found`);
      process.exit(1);
    }
    
    console.log(`Found user: ${user.name} (${user.role})`);
    
    // Update role to rider if it's vendor
    if (user.role !== 'rider') {
      user.role = 'rider';
      await user.save();
      console.log(`✅ Updated role to 'rider'\n`);
    }
    
    // Check if rider profile exists
    let rider = await Rider.findOne({ where: { user_id: user.id } });
    
    if (!rider) {
      console.log(`📝 Creating Rider profile...`);
      rider = await Rider.create({
        user_id: user.id,
        vehicle_type: 'Bike',
        vehicle_number: null,
        license_number: null,
        is_verified: false,
        is_available: false,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log(`✅ Rider profile created\n`);
    } else {
      console.log(`✅ Rider profile already exists\n`);
    }
    
    console.log(`✅ Account fixed! Rider can now login.`);
    console.log(`   📱 Phone: ${phone}`);
    console.log(`   👤 Name: ${user.name}`);
    console.log(`   🎯 Role: ${user.role}`);
    console.log(`   🆔 Rider ID: ${rider.id}`);
    
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

const phone = process.argv[2];
if (!phone) {
  console.error('❌ Usage: node fix-rider-account.js <phone>');
  process.exit(1);
}

fixRiderAccount(phone);
