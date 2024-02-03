// const roomName = JSON.parse(document.getElementById('room-name').textContent);
// const goodsId = url.searchParams.get('room_name');

var host="127.0.0.1:8000"
if(localStorage.getItem('room_name')){
    var room_name = localStorage.getItem('room_name')
   }
// const roomName=Response.data
console.log(room_name)
console.log(payload)
console.log("user_id", payload["user_id"])
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
    let type=data.type_name
    let message=data.message
    let board_state=data.board_state
    console.log("message받음",data)
    console.log("data.board_state받음",data.board_state)
    console.log("data.board_state받음",data.type_name)

    if (type === 'message') {
        let temp_html = `
        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
        `
        $('#chatLog').append(temp_html)
        return
    }
    if (type === 'board_state') {
        let temp_html = `
        <div style=" margin: 5px 20px 5px 20px;"> ${board_state} </div>
        `
        $('#board_state').append(temp_html)

        return
    }

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
            'type':'message',
            'message': message
    }));
    // 메세진 전송후 입력창에 빈값 넣어주기
    messageInputDom.value = '';
};

function StartGame() {
    let user_id = payload['user_id']

    $.ajax({
        type: 'post',
        url: `${hostUrl}/chess/`,
        data: {},
        success: function (response) {
            let board_state=response.board_state
            console.log("gamestart: ", board_state)
            $('#start_game').hide()
            let temp_html = `
            <div style=" margin: 5px 20px 5px 20px;"> ${board_state} </div>
            `
            $('#board_state').append(temp_html)},
    });


}

function MoveHorse() {
    var horseInputDom = document.querySelector('#horse_input');
    var horse = horseInputDom.value;
    // var element = document.getElementById('chat-wrap');
    if (horse === '') {
        return
    }
    // if(!payload || !token){
    //     if(!confirm('로그인 후 이용가능합니다. 로그인하러 갈까요?')){
    //         return    
    //     }
    //     window.location.href ='/user/login.html'
    //     return
    // }
    console.log("MoveHorse", )
    if (chatSocket.readyState === WebSocket.OPEN) {
        console.log('opened')
        chatSocket.send(JSON.stringify({
            'horse':horse,
            'type': "horse",
            'user_id': payload['user_id'],
            'message':"me"
        }))
    } else {
        setTimeout(MoveHorse, 500)
    }
    horseInputDom.value = '';
};

function MoveHorse2() {

    $.ajax({
        type: 'post',
        url: `${hostUrl}/goods/${goodsId}`,
        data: {},
        success: function (response) {
            console.log("review get: ", response)
            let user_id = payload['user_id']
            let seller_id = response['seller']['id']
            if (user_id == seller_id) {
                window.location.href = `/review/seller.html?goods_id=${goodsId}`
            } else {
                window.location.href = `/review/buyer.html?goods_id=${goodsId}`
            }
        },
    });
}

function GetHorse() {

    $.ajax({
        type: 'post',
        url: `${hostUrl}/goods/${goodsId}`,
        data: {user_id:user_id},
        success: function (response) {
            console.log("review get: ", response)
            let user_id = payload['user_id']
            let seller_id = response['seller']['id']
            if (user_id == seller_id) {
                window.location.href = `/review/seller.html?goods_id=${goodsId}`
            } else {
                window.location.href = `/review/buyer.html?goods_id=${goodsId}`
            }
        },
    });
}