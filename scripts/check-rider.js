#!/usr/bin/env node

/**
 * Script to check if a rider exists and get their details
 * Usage: node check-rider.js <phone>
 * Example: node check-rider.js 6370828142
 */

require('dotenv').config();
const { User, Rider } = require('../models');

async function checkRider(phone) {
  try {
    console.log(`🔍 Looking for user with phone: ${phone}`);
    
    const user = await User.findOne({ where: { phone } });
    
    if (!user) {
      console.log(`❌ No user found with phone ${phone}`);
      process.exit(0);
    }

    console.log(`✅ User found!`);
    console.log(`  ID: ${user.id}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Phone: ${user.phone}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Active: ${user.is_active}`);
    console.log(`  Created: ${user.created_at}`);

    if (user.role === 'rider') {
      const rider = await Rider.findOne({ where: { user_id: user.id } });
      if (rider) {
        console.log(`\n🚗 Rider Profile:`);
        console.log(`  Rider ID: ${rider.id}`);
        console.log(`  Vehicle Type: ${rider.vehicle_type}`);
        console.log(`  Vehicle Number: ${rider.vehicle_number}`);
        console.log(`  License Number: ${rider.license_number}`);
        console.log(`  Verified: ${rider.is_verified}`);
        console.log(`  Available: ${rider.is_available}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking rider:', error.message);
    process.exit(1);
  }
}

const phone = process.argv[2];

if (!phone) {
  console.error('❌ Usage: node check-rider.js <phone>');
  console.error('Example: node check-rider.js 6370828142');
  process.exit(1);
}

checkRider(phone);
