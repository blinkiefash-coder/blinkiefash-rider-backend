#!/usr/bin/env node

/**
 * Script to register a new rider
 * Usage: node register-rider.js <phone> <password> [name] [vehicle_type]
 * Example: node register-rider.js 6370828142 Satyam@123 Satyam "Bike"
 */

const http = require('http');
const https = require('https');

async function registerRider(phone, password, name = 'Rider', vehicleType = 'Bike') {
  return new Promise((resolve, reject) => {
    const apiUrl = process.env.RIDER_API_URL || 'http://localhost:5000';
    const url = new URL(`${apiUrl}/rider/register`);
    
    // Use https or http based on URL scheme
    const httpModule = url.protocol === 'https:' ? https : http;

    const requestBody = JSON.stringify({
      name,
      phone,
      password,
      vehicle_type: vehicleType,
      vehicle_number: null,
      license_number: null,
      documentType: 'license',
      documentUrl: null
    });

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    // Allow self-signed certificates
    if (url.protocol === 'https:') {
      options.rejectUnauthorized = false;
    }

    console.log(`📝 Registering rider: ${name} (${phone})`);
    console.log(`🔗 API URL: ${apiUrl}/rider/register`);

    const req = httpModule.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.token) {
            console.log('✅ Rider registered successfully!');
            console.log(`📱 Phone: ${phone}`);
            console.log(`🔑 Password: ${password}`);
            console.log(`👤 Name: ${name}`);
            console.log(`🎯 Vehicle Type: ${vehicleType}`);
            console.log(`🔐 JWT Token: ${response.token}`);
            resolve(response);
          } else if (response.message) {
            console.error(`❌ Error: ${response.message}`);
            reject(new Error(response.message));
          } else {
            console.error('❌ Unexpected response:', response);
            reject(new Error('Registration failed'));
          }
        } catch (err) {
          console.error('❌ Failed to parse response:', err.message);
          console.error('Response body:', data);
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
        console.error(`❌ Connection refused. Is the server running on ${apiUrl}?`);
      } else {
        console.error(`❌ Request error: ${err.message}`);
      }
      reject(err);
    });

    req.write(requestBody);
    req.end();
  });
}

// Get parameters from command line
const phone = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Rider';
const vehicleType = process.argv[5] || 'Bike';

if (!phone || !password) {
  console.error('❌ Usage: node register-rider.js <phone> <password> [name] [vehicle_type]');
  console.error('Example: node register-rider.js 6370828142 Satyam@123 Satyam "Bike"');
  process.exit(1);
}

registerRider(phone, password, name, vehicleType)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('Registration failed');
    process.exit(1);
  });
