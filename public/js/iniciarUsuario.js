const input = document.getElementById('usuario');

const iniciar_usuario = () => {
    const usuario = input.value;
    localStorage.setItem('usuario', usuario);
}