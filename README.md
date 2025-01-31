# Node.js API Consumer with HTTP

This is a simple Node.js project that consumes an external API using the HTTP module.

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Start the server:
   ```sh
   node app.js
   ```
2. Open a browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Consumption
This project makes API requests using Node.js HTTP module. Example:
```javascript
const http = require('http');
const url = 'https://api.example.com/data';

http.get(url, (res) => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
}).on('error', (err) => {
    console.error('Error fetching API:', err.message);
});
```

## Dependencies
Ensure you have **Node.js** installed. You can check by running:
```sh
node -v
```

## License
This project is licensed under the MIT License.

