//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io();

let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');

var clientes = [];

boton.addEventListener('click', () => {
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  }

  if ( mensaje.value === '' || usuario.value === '') {
    alert('Se requiere un mensaje y un usuario')
  } else {
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
})

mensaje.addEventListener('keydown', () => {
  socket.emit('chat:escribiendo', usuario.value);
})

socket.on('chat:mensaje', data => {
  salida.innerHTML += '<p><strong>' + data.usuario + '</strong>: ' + data.mensaje + '</p>'
  notificaciones.innerHTML = '';
})

socket.on('chat:escribiendo', (data) => {
  notificaciones.innerHTML = '<p><em>' + data + '</em> esta escribiendo...</p>'
})