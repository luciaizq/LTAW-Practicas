//-- Elementos del interfaz
const display = document.getElementById("display");
const user = document.getElementById("msg_entry");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();


socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
user.onchange = () => {
  if (user.value)
    socket.send(user.value);
  
  //-- Borrar el mensaje actual
  user.value = "";
}