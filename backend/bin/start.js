'use Strict';  
 
require('@babel/register')
require('@babel/polyfill');
const http = require ('http');
const socketIO = require("socket.io");

const app = require('../app').default;
const server = http.createServer(app);

const users = [{}];

const io = socketIO(server);

io.on("connection",(socket)=>{
   console.log("New Connection--socket");

   socket.on('joined',({userdata})=>{
      users[socket.id] = userdata;
      console.log(`${userdata} has joined `);
      socket.broadcast.emit('userJoined',{userdata:"Admin", message:`${userdata} has Joined !!!`});
      socket.emit('welcome',{userdata:"Admin",message:`Welcome to the Chat, ${userdata}`});
   })

   socket.on('message',({message,id})=>{
      io.emit('sendMessage',{userdata:users[id],message,id});
  })

   socket.on('disconnect', () => {
      socket.broadcast.emit('leave',{userdata:"Admin",message:`User has left`});
      console.log("user Left");
   })

});

const config = require('../config/config')
// console.log(process.env.Node_env);
const configvalue = config.get(process.env.Node_env);

const port = configvalue.PORTNO;

server.listen(port);

server.on('listening', ()=> {
   console.log(`Listening on ${port}`);
});
