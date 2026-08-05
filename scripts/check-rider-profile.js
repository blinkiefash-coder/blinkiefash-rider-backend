#!/usr/bin/env node

/**
 * Script to check if rider has a profile record in the database
 * Usage: node check-rider-profile.js <phone>
 * Example: node check-rider-profile.js 0000000001
 */

require('dotenv').config();
const { User, Rider } = require('../models');

async function checkRiderProfile(phone) {
  try {
    console.log(`🔍 Checking rider profile for phone: ${phone}\n`);
    
    const user = await User.findOne({ where: { phone } });
    
    if (!user) {
      console.log(`❌ User not found with phone: ${phone}`);
      process.exit(1);
    }
    
    console.log(`✅ User found:`);
    console.log(`   📱 Phone: ${user.phone}`);
    console.log(`   👤 Name: ${user.name}`);
    console.log(`   🆔 User ID: ${user.id}`);
    console.log(`   🔑 Role: ${user.role}`);
    console.log(`   ⚙️  Active: ${user.is_active}\n`);
    
    const rider = await Rider.findOne({ where: { user_id: user.id } });
    
    if (!rider) {
      console.log(`❌ ERROR: Rider profile NOT found in database!`);
      console.log(`   The user exists but has no Rider record.`);
      console.log(`   This is why login fails with "Rider profile not found"\n`);
      console.log(`🔧 FIX: Need to create Rider profile record\n`);
      process.exit(1);
    }
    
    console.log(`✅ Rider profile found:`);
    console.log(`   🆔 Rider ID: ${rider.id}`);
    console.log(`   🚗 Vehicle Type: ${rider.vehicle_type}`);
    console.log(`   🚙 Vehicle Number: ${rider.vehicle_number || 'N/A'}`);
    console.log(`   📜 License Number: ${rider.license_number || 'N/A'}`);
    console.log(`   ✓ Verified: ${rider.is_verified}`);
    console.log(`   🟢 Available: ${rider.is_available}\n`);
    console.log(`✅ Rider can successfully login!`);
    
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

const phone = process.argv[2];
if (!phone) {
  console.error('❌ Usage: node check-rider-profile.js <phone>');
  console.error('Example: node check-rider-profile.js 0000000001');
  process.exit(1);
}

checkRiderProfile(phone);
