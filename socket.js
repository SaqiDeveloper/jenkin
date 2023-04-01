const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Store connected clients
let connectedClients = {};

io.on('connection', (socket) => {
  console.log('User connected');

  // Handle new messages
  socket.on('message', (message) => {
    console.log(`Received message from ${message.sender} to ${message.receiver}: ${message.content}`);

    // Store message in data store
    // ...

    // Send message to the receiver
    const receiverSocket = connectedClients[message.receiver];
    if (receiverSocket) {
      receiverSocket.emit('message', message);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');

    // Remove client from connectedClients
    for (const clientId in connectedClients) {
      if (connectedClients[clientId] === socket) {
        delete connectedClients[clientId];
        break;
      }
    }
  });

  // Handle new user connections
  socket.on('user-connected', (clientId) => {
    console.log(`User ${clientId} connected`);

    // Store client in connectedClients
    connectedClients[clientId] = socket;
  });
});

http.listen(3000, () => {
  console.log('Server started on port 3000');
});