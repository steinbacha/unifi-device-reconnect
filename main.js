const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

// Controller details
const controllerUrl = process.env.CONTROLLER_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const site = process.env.SITE; // Replace with the site name if different

// Device MAC address to reset
const deviceMac = process.env.DEVICE_MAC;



// Create an axios instance with necessary settings
const instance = axios.create({
  baseURL: controllerUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new (require('https').Agent)({
    rejectUnauthorized: false, // Ignore SSL certificate warnings if using self-signed certificate
  }),
});

// Authenticate and get the session cookie
async function login() {
  try {
    const response = await instance.post('/api/login', {
      username: username,
      password: password,
    });
    // Save the session cookie for subsequent requests
    instance.defaults.headers['Cookie'] = response.headers['set-cookie'];
    console.log('Logged in successfully');
  } catch (error) {
    console.error('Login failed:', error.message);
  }
}

// Reset the device by MAC address
async function reconnectClient() {
    try {
      const response = await instance.post(`/api/s/${site}/cmd/stamgr`, {
        cmd: 'kick-sta',
        mac: deviceMac, // The MAC address of the client to reconnect
      });
      console.log('Client reconnect command sent:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Failed to reconnect client:', error.response.data);
      } else {
        console.error('Failed to reconnect client:', error.message);
      }
    }
  }
  
  

// Logout from the UniFi Controller
async function logout() {
  try {
    await instance.post('/api/auth/logout');
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout failed:', error.message);
  }
}

// Main function to execute the workflow
async function main() {
  await login();
  await reconnectClient();
  await logout();
}

main();
