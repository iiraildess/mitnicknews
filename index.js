const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const hbs = require("express-handlebars");
const db = require('./mysql/database.js');
const { getIP } = require('./funcs/ip.js');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.engine('hbs', hbs.engine({ extname: ".hbs" }));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

app.get("/login", async(req, res) =>{
  const ip = await getIP()
})

app.get('/', async(req, res) => {
  res.render("home");
});

let connectedUsers = []

io.on('connection', (socket) => {
  console.log(`a user connected => ${socket.id}`);
  
  const user = { id: socket.id }
  connectedUsers.push(user)
  console.log("users connected =>", connectedUsers)

  io.emit('updateUserList', connectedUsers);


  socket.on("disconnect", ()=>{
    console.log(`user disconnected => ${socket.id}`)

    connectedUsers = connectedUsers.filter(user => user.id !== socket.id)
    console.log("users connected =>", connectedUsers)

    io.emit('updateUserList', connectedUsers);
  })

});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});