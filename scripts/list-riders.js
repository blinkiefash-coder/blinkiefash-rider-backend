#!/usr/bin/env node

/**
 * List all rider users and their phones
 */

require('dotenv').config();
const { User } = require('../models');

async function listRiders() {
  try {
    const riders = await User.findAll({ where: { role: 'rider' } });
    console.log(`Found ${riders.length} riders:\n`);
    
    riders.forEach(r => {
      console.log(`  📱 ${r.phone} - ${r.name}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

listRiders();
