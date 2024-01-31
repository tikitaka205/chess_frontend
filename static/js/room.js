// const roomName = JSON.parse(document.getElementById('room-name').textContent);
// const goodsId = url.searchParams.get('room_name');

var host="127.0.0.1:8000"
if(localStorage.getItem('room_name')){
    var room_name = localStorage.getItem('room_name')
   }
// const roomName=Response.data
console.log(room_name)
const chatSocket = new WebSocket(
    'ws://'
    + host
    + '/ws/chat/'
    + room_name
    + '/'
);
console.log(chatSocket)

chatSocket.onmessage = function(e) {
    let data = JSON.parse(e.data);
    // console.log("message받음",data)
    console.log("data.message받음",data.message)
    let message=data.message
    let temp_html = `
    <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
    `
    $('#chatLog').append(temp_html)

}

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
chatSocket.onerror=(e) =>{
    console.log("error");
}


let chatMessageInput = document.querySelector("#chat_input");
let chatMessageSend = document.querySelector("#chat_send");
console.log("chatSocket.readyState",chatSocket.readyState)
console.log("WebSocket.open",chatSocket.OPEN)

chatMessageInput.focus();
chatMessageInput.onkeyup = function (e) {
    if (e.keyCode === 'Enter') {  // enter, return
        chatMessageSend.click();
    }
};


chatMessageSend.onclick = function (e) {
    var messageInputDom = chatMessageInput;
    var message = messageInputDom.value;
    console.log("message 보냄",message)
        chatSocket.send(JSON.stringify({
            'message': message
    }));
    // 메세진 전송후 입력창에 빈값 넣어주기
    messageInputDom.value = '';
};
