import express from 'express';
import http from 'http';
import socket from 'socket.io'

var app = express();
var server = http.Server(app);
var io = socket(server);

app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), () => console.log('Servidor'));

app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log('hola prro')
  res.sendFile(__dirname + '/public');
});

io.on('connection', function (socket) {
  console.log('socket conectado', socket.id);
  io.emit('desconectado', {
    texto: 'Socket desconectado.',
    id: socket.id,
  });

  socket.on('disconnect', () => {
    console.log('socket desconectado', socket.id);
    io.emit('desconectado', {
      texto: 'Socket desconectado.',
      id: socket.id,
    });
  });

  socket.on('chat:mensaje', (data) => {
    io.emit('chat:mensaje', data);
  })

  socket.on('chat:escribiendo', (usuario) => {
    socket.broadcast.emit('chat:escribiendo', usuario);
  })

});
