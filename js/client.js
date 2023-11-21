const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form=document.getElementById('send-container')
const mssginp=document.getElementById('message-input');
const btn=document.getElementById('send-button');
const container=document.querySelector(".container");

var audio=new Audio('abc.mp3');


const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.append(messageElement);
    if(position=='right'){
    audio.play();}
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=mssginp.value;
    append(`You: ${message}`,'left');
    socket.emit('send',message);
    mssginp.value='';
})

const username= prompt("enter your name");
// if (username) {
//     socket.emit('new-user-joined', username);
//     console.log(username);
// } else {
//     alert('Please enter a valid name.');
// }


socket.emit('new-user-joined',username);

socket.on('user-joined',username=>{
    append(`${username} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message} `,'right')
})



socket.on('leave',username=>{
    append(`${username} left`,'right')
})

