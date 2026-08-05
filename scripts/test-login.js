#!/usr/bin/env node

/**
 * Script to test rider login
 * Usage: node test-login.js <phone> <password>
 * Example: node test-login.js 0000000001 Satyam@123
 */

const https = require('https');

async function testLogin(phone, password) {
  return new Promise((resolve, reject) => {
    const apiUrl = process.env.RIDER_API_URL || 'https://blinkiefash-rider-backend.onrender.com';
    const url = new URL(`${apiUrl}/user/login`);

    const requestBody = JSON.stringify({
      phone,
      password
    });

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      rejectUnauthorized: false
    };

    console.log(`🔐 Testing login for rider: ${phone}`);
    console.log(`🔗 API URL: ${apiUrl}/user/login`);
    console.log(`⏳ Sending login request...`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.token) {
            console.log('\n✅ LOGIN SUCCESSFUL!\n');
            console.log(`📱 Phone: ${phone}`);
            console.log(`🔑 Password: ${password}`);
            console.log(`👤 Rider ID: ${response.rider?.id || response.riderId || 'N/A'}`);
            console.log(`🆔 User ID: ${response.user?.id || response.userId || 'N/A'}`);
            console.log(`🔐 JWT Token: ${response.token.substring(0, 50)}...`);
            console.log(`\n✅ Rider can successfully login!`);
            resolve(response);
          } else if (response.message) {
            console.log(`\n❌ Login Failed: ${response.message}\n`);
            console.log(`📱 Phone: ${phone}`);
            console.log(`🔑 Password: ${password}`);
            reject(new Error(response.message));
          } else {
            console.log(`\n❌ Unexpected response:\n`, response);
            reject(new Error('Login failed'));
          }
        } catch (err) {
          console.error('❌ Failed to parse response:', err.message);
          console.error('Response body:', data);
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      console.error(`❌ Request error: ${err.message}`);
      reject(err);
    });

    req.write(requestBody);
    req.end();
  });
}

const phone = process.argv[2];
const password = process.argv[3];

if (!phone || !password) {
  console.error('❌ Usage: node test-login.js <phone> <password>');
  console.error('Example: node test-login.js 0000000001 Satyam@123');
  process.exit(1);
}

testLogin(phone, password)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    process.exit(1);
  });
