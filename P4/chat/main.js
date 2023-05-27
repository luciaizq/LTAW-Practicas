const electron = require('electron');

console.log("Arrancando electron...");

electron.app.on('ready', () => {
    console.log("Evento Ready!");

    // Ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 1500,    
        height: 1000,  

        // Acceso al sistema
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  // Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

  win.on('ready-to-show', () => {
    win.webContents.send('ip', 'http://' + ip.address() + ':' + PUERTO);
  });

  // Enviar mensaje de prueba
  electron.ipcMain.handle("btn_test", async(event, mensaje) => {
    console.log(mensaje);
    io.send("Hola a todos", mensaje);
    win.webContents.send("recibiendo", "Prueba");
  }
  )
});

// Dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const ip = require('ip');

// Definir el puerto
const PUERTO = 9000;

// Crear una nueva aplciacion web
const app = express();

// Servidor y servidor de websockets.
const server = http.Server(app);
const io = socket(server);

app.get('/', (req, res) => {
  res.send('Bienvenido' + '<p><a href="/chat.html">Chat</a></p>');
});


app.use('/', express.static(__dirname +'/'));

// Ficheros estáticos
app.use(express.static('public'));

// Nueva conexión
io.on('connect', (socket) => {
  
  console.log('Se ha conectado un usuario'.red);

  win.webContents.send("numeroclientes",io.engine.clientsCount);

  // Usuario dexconectado
  socket.on('disconnect', function(){
    console.log('Se ha desconectado un usuario'.red);

    win.webContents.send("numeroclientes",io.engine.clientsCount);
  
  });  

  socket.on("message", (msg)=> {
    console.log(`Mensaje recibido!:` + msg.blue);
    const command = msg.split("/")[1];

switch (command) {
  case 'help':
    socket.send("Comandos soportados : /hello, /list, /hour y /date");
    break;

  case 'hello':
    socket.send('Bienvenido');
  break;

  case 'list':
    const users = 'Se ha desconectado un usuario: ' + io.engine.clientsCount;
    socket.send(users);
    break;

  case 'hour':
    const currentTime = new Date();
    const timeString = 'Hora: ' + currentTime.toLocaleTimeString();
    socket.send(timeString);
  break;

  case 'date':
    const currentDate = new Date();
    const dateString = 'Fecha: ' + currentDate.toLocaleDateString();
    socket.send(dateString);
    break;

  default:
    io.send(msg);
    break;
    win.webContents.send("recibiendo", msg);
}
  });

});


server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);