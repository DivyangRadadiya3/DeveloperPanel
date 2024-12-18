const WebSocket = require('ws'); // If using Node.js, install 'ws' package with npm

// Replace with your WebSocket server URL
const ws = new WebSocket('wss://dev-admin.bharatexamfest.com:5060/ws');

// When the connection opens
ws.on('open', function open() {
    console.log('WebSocket connection opened');
    ws.send('Hello Server!');
});

// When a message is received from the server
ws.on('message', function incoming(data) {
    console.log('Received from server: ', data);
});

// When the connection is closed
ws.on('close', function close() {
    console.log('WebSocket connection closed');
});

// When there's an error
ws.on('error', function error(err) {
    console.error('WebSocket error: ', err);
});
