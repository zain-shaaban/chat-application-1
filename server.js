require("dotenv").config();
const http=require("http");
const {Server}=require("socket.io");
const express=require("express");
const formatMessages=require("./utils/format");
const {getCurrentUser,addNewUser,removeUser,getRoom}=require("./utils/users")

const botName="Zein";
const app=express();
const server=http.createServer(app);
const io=new Server(server);

app.use(express.static("public"));

io.on("connection",socket=>{
    socket.on("newJoin",({username,room})=>{
        const user=addNewUser(socket.id,username,room);
        socket.join(user.room);
        socket.emit("message",formatMessages(username,`welcome to ${user.room} chat`));
        socket.broadcast.to(user.room).emit("message",formatMessages(username,`${user.username} Has Joined to Chat`))
        io.to(user.room).emit("roomUsers",{room:user.room,users:getRoom(user.room)})
    })

    socket.on("disconnect",()=>{
        const user=removeUser(socket.id);
        if(user){
        io.to(user.room).emit("message",formatMessages(user.username,`${user.username} Has Disconnected...`));
        io.to(user.room).emit("roomUsers",{room:user.room,users:getRoom(user.room)})
    }
})

    socket.on("chatMessage",(data)=>{
        const user=getCurrentUser(socket.id);

        io.emit("message",formatMessages(user.username,data));
    })
})
PORT=process.env.PORT||3000;

server.listen(PORT,()=>{console.log(`Server Running On port ${PORT}`)})