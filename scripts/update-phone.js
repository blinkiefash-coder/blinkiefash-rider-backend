#!/usr/bin/env node

/**
 * Script to update phone number in database
 * Usage: node update-phone.js <old_phone> <new_phone>
 */

require('dotenv').config();
const { User } = require('../models');

async function updatePhone(oldPhone, newPhone) {
  try {
    console.log(`🔄 Updating phone number...\n`);
    
    const user = await User.findOne({ where: { phone: oldPhone } });
    if (!user) {
      console.log(`❌ User not found with phone: ${oldPhone}`);
      process.exit(1);
    }
    
    console.log(`Found user: ${user.name}`);
    console.log(`Old phone: ${user.phone}`);
    
    user.phone = newPhone;
    await user.save();
    
    console.log(`✅ Phone updated to: ${newPhone}`);
    console.log(`\n✅ User can now login with new phone number`);
    
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
}

const oldPhone = process.argv[2];
const newPhone = process.argv[3];

if (!oldPhone || !newPhone) {
  console.error('❌ Usage: node update-phone.js <old_phone> <new_phone>');
  console.error('Example: node update-phone.js 0000000001 +910000000001');
  process.exit(1);
}

updatePhone(oldPhone, newPhone);
