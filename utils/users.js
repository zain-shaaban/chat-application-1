let users=[];

function addNewUser(id,username,room){
    const User={id,username,room};
    users.push(User);
    return User;
}

function getCurrentUser(id){
    const User=users.find(ele=>ele.id===id);
    return User;
}

function removeUser(id){
    const find=users.find(ele=>ele.id===id);
    const index=users.indexOf(find);
    if(index!==-1){
        return users.splice(index,1)[0];
    }
}

function getRoom(room){
    return users.filter(ele=>ele.room===room)
}

module.exports={
    addNewUser,
    getCurrentUser,
    removeUser,
    getRoom
}