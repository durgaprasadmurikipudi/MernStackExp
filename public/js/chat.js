const socket = io();

// the parameter for listener doesnot matter. Ofcourse as obvious as it can be.
socket.on('message', message => {
  console.log('The message from server', message);
});

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements['messageBox'].value;
  socket.emit('message', message);
});

document.getElementById('send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation API is not supported by browser');
  }

  navigator.geolocation.getCurrentPosition( position => {
    
    socket.emit('sendLocation', position.coords.latitude + ";" + position.coords.longitude, message => {
      console.log('event acknowledge from server', message);
    });
  });
});