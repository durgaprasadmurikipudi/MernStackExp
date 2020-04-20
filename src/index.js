const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); // This statement is handled by express, even if we don't do it, but we are configuring it
                                       // explicitly to have socket along with express.
const io = socketio(server);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('New connection request came');
  socket.emit('message', 'Hi there!, how are you?');
  socket.broadcast.emit('message', 'A new user has joined!');
  
  socket.on('message', (message, callback) => {
    io.emit('message', message);
    callback('Message emitted successfully!');
  });

  socket.on('sendLocation', (coords) => {
    const [latitude, longitude] = coords.split(';');
    socket.broadcast.emit('message', `www.google.com/maps?q=${latitude},${longitude}`);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has disconnected!');
  });
});


server.listen(port, () => {
  console.log('App is running at port 3000')
});

require('./temp');
require('./temp1');