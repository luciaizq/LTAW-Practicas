//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usuario = document.getElementById("user");

// hasta que el User no reciba un nombre será anonimo
let User = "Anónimo";
//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
// declado una variable sonido que sonara cuando haya un nuevo mensaje
let sonido = new Audio('tono.mp3');

socket.on("message", (msg)=>{
  display.innerHTML += '<p style="color:blue">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
  //pongo el nombre de usuario y el mensaje enviado
    socket.send(User + ": <br>" + msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
  //añado sonido de mensaje
  sonido.play();
}
// Al cambiar el valor usuario...
usuario.onchange = () => {
  if (usuario.value )
  // el usuario pasa a llamarse como lo has declarado tu
  User = usuario.value;
  console.log("nombre usuario"+ usuario.value);
  // Desaparece el display que te permite cambiar el nombre
  document.getElementById("user").style.display = "none";
  
}