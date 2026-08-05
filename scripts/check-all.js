#!/usr/bin/env node

require('dotenv').config();
const { User, Rider } = require('../models');

async function checkUser(phone) {
  try {
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      console.log(`❌ Not found: ${phone}`);
      return;
    }
    
    const rider = await Rider.findOne({ where: { user_id: user.id } });
    
    console.log(`\n📱 Phone: ${phone}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Rider Profile: ${rider ? '✅ Yes' : '❌ No'}`);
    
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

async function check() {
  await checkUser('9999999999');
  await checkUser('+919999999999');
  await checkUser('+910000000001');
  process.exit(0);
}

check();
