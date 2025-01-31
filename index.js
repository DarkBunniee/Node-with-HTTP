const express = require('express');
const https = require('https');
const { URL } = require('url');
const path = require('path');


// Import dotenv and configure it
require('dotenv').config();


// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Define the API URL
const apiUrl = process.env.ENCRY_URL;
const apiUrlItem = process.env.ENCRY_URL_ITEM;

// Basic Authentication credentials
const username = process.env.ENCRY_USERNAME;
const password = process.env.ENCRY_PASSWORD;

// Encode credentials to base64 for basic auth
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to load headers
app.get('/api/headers', (req, res) => {
  const url = new URL(apiUrl);
  
  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
    },
  };

  const reqApi = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const headers = JSON.parse(data).value || [];
        res.json(headers); // Send the headers data as JSON response
      } catch (error) {
        console.error('Error parsing response:', error);
        res.status(500).send('Error fetching headers');
      }
    });
  });

  reqApi.on('error', (error) => {
    console.error('Request failed:', error);
    res.status(500).send('Request failed');
  });

  reqApi.end();
});

// Route to load items for a specific header
app.get('/api/items', (req, res) => {
  const { headerId } = req.query;
  // const url = new URL('{apiUrlItem}?headerId=${headerId}');
  const url = new URL(apiUrlItem);
  
  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname + url.search,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
    },
  };

  const reqApi = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const items = JSON.parse(data).value || [];
        res.json(items); // Send the items data as JSON response
      } catch (error) {
        console.error('Error parsing items:', error);
        res.status(500).send('Error fetching items');
      }
    });
  });

  reqApi.on('error', (error) => {
    console.error('Request failed:', error);
    res.status(500).send('Request failed');
  });

  reqApi.end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
