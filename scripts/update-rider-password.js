#!/usr/bin/env node

/**
 * Script to update a rider's password directly in the database
 * Usage: node update-rider-password.js <phone> <new_password>
 * Example: node update-rider-password.js 9999999999 satyam
 */

require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models');

async function updateRiderPassword(phone, newPassword) {
  try {
    // Validate inputs
    if (!phone || !newPassword) {
      console.error('❌ Error: Both phone number and new password are required');
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.error('❌ Error: Password must be at least 6 characters long');
      process.exit(1);
    }

    console.log(`🔄 Connecting to database...`);
    
    // Find user by phone
    const user = await User.findOne({ where: { phone } });
    
    if (!user) {
      console.error(`❌ Error: No rider found with phone number ${phone}`);
      process.exit(1);
    }

    console.log(`✅ Found rider: ${user.name} (${user.phone})`);
    console.log(`🔐 Hashing new password...`);

    // Hash the new password with bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    user.password = hashedPassword;
    user.updated_at = new Date();
    await user.save();

    console.log(`✅ Password updated successfully for rider: ${user.name} (${user.phone})`);
    console.log(`✅ Rider can now login with phone: ${phone} and password: ${newPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating password:', error.message);
    process.exit(1);
  }
}

// Get phone and password from command line arguments
const phone = process.argv[2];
const newPassword = process.argv[3];

updateRiderPassword(phone, newPassword);
