const express = require('express' ) ; 
const app = express();
const http = require('http');
const server = http.createServer(app);
const port =  9000
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server) 

app.get('/', (req,res ,next)=>{
  
 res.sendFile(path.join(__dirname, 'public/index.html'))     
})

io.on("connection", (socket) => {
    socket.on("msgFromFrontend" , (msg)=>{
        console.log(msg);
        io.emit("msgFromBackend", `${socket.id} : ${msg}`)
    })  
  });
  
  io.listen(3000);

server.listen(port,()=> {
    console.log( `serever is listening on htps://localhost:${port} `)
})   