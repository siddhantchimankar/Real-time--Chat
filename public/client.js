
const socket = io()

let n;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message_area')

do {

    n = prompt('Please enter your name :')

} while (!n);


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    
    let msg = {
        user : n,
        message : message.trim()
    }

    appendMessage(msg, 'outgoing_message')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h6> ${msg.user} </h6>
        <p> ${msg.message} </p>
    `
 
    mainDiv.innerHTML = markup
    console.log(mainDiv);
    messageArea.appendChild(mainDiv)

}


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


socket.on('message', (msg) => {
    
    appendMessage(msg, 'incoming_message')
    scrollToBottom()

})
