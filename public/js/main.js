const socket = io();
const chatMessage=document.querySelector(".chat-messages")
const chatForm=document.getElementById("chat-form");
const roomName=document.getElementById("room-name");
const usersList=document.getElementById("users")
socket.emit("newJoin",Qs.parse(location.search,{ignoreQueryPrefix:true}))

const msg=chatForm.addEventListener("submit",e=>{
    e.preventDefault();

    const message=e.target.elements.msg.value;

    socket.emit("chatMessage",message);
    e.target.elements.msg.value="";
    e.target.elements.msg.focus=true;
})

socket.on("roomUsers",({room,users})=>{
    outputRoomName(room);
    outputRoomUsers(users);
})
socket.on("message",(mes)=>{
    console.log(mes);
    createMessage(mes);
    chatMessage.scrollTop=chatMessage.scrollHeight;
})

function createMessage(message){
    const div=document.createElement('div');
    div.classList.add("message");
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(name){
    roomName.innerHTML=name;
}
function outputRoomUsers(users){
    usersList.innerHTML=`${users.map(element=>`<li>${element.username}</li>`).join('')}`
}