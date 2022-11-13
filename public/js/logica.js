//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io();
const usuario = localStorage.getItem('usuario')
if (usuario == null) {
  window.location.assign('/')
}

const fecha = new Date();

let mensaje = document.getElementById('mensaje');
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');

var clientes = [];

boton.addEventListener('click', () => {
  var data = {
    mensaje: mensaje.value,
    usuario: usuario,
  }

  if ( mensaje.value === '') {
    alert('Se requiere un mensaje')
  } else {
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
})

mensaje.addEventListener('keydown', () => {
  socket.emit('chat:escribiendo', usuario);
})

socket.on('chat:mensaje', data => {
  if (data.usuario == usuario){
    salida.innerHTML += '<div><div class="mensaje-blue"><span>' + fecha.toLocaleTimeString() + '</span><p><strong>' + data.usuario + '</strong>: ' + data.mensaje + '</p></div></div>';
  } else {
    salida.innerHTML += '<div><div class="mensaje"><span>' + fecha.toLocaleTimeString() + '</span><p><strong>' + data.usuario + '</strong>: ' + data.mensaje + '</p></div></div>';
  }
  notificaciones.innerHTML = '';
})

socket.on('chat:escribiendo', (data) => {
  notificaciones.innerHTML = '<p><em>' + data + '</em> esta escribiendo...</p>'
})