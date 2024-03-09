// const roomName = JSON.parse(document.getElementById('room-name').textContent);
// const goodsId = url.searchParams.get('room_name');
const token = localStorage.getItem('access');

var host="127.0.0.1:8000"
if(localStorage.getItem('room_name')){
    var room_name = localStorage.getItem('room_name')
    $('#room_number').append("room :",room_name)

   }
// const roomName=Response.data
console.log(room_name)
console.log(payload)
// console.log("user_id", payload["user_id"])
const chatSocket = new WebSocket(
    'ws://'
    + host
    + '/ws/chat/'
    + room_name
    + '/'
);
console.log(chatSocket)

chatSocket.onmessage = function(e) {
    // 상대방과 내가 서버에보낸 데이터 바로 가져옴
    let data = JSON.parse(e.data);
    console.log(data)
    let type=data.type_name
    let message=data.message
    let alarm=data.alarm
    let board_state=data.board_state
    
    console.log("data",data)
    console.log("data.board_state받음",data.board_state)
    // console.log("data.board_state받음",data.type_name)

    // 데이터 타입 메세지인 경우 메세지에 나타냄
    if (type === 'message') {
        let temp_html = `
        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
        `
        $('#chatLog').append(temp_html)
        return
    }
    // 데이터 타입 보드상태인 경우 보드에 나타냄
    if (type === 'board_state') {
        $('#board_state *').remove()
        localStorage.clear()
        // console.log("local clear")
        localStorage.setItem('board', JSON.stringify(board_state))
        // console.log("local set new board")

        const chessBoardTable = createChessBoardTable(board_state);
        const chessBoardContainer = document.getElementById('board_state');
        chessBoardContainer.appendChild(chessBoardTable);

        $('#alarm *').remove()
        let temp_html = `
        <div style=" margin: 5px 20px 5px 20px;"> ${alarm} </div>
        `
        $('#alarm').append(temp_html)

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

// TODO
// 준비완료, 게임시작, 나가면 방제거
// 내가있는 방 준비로 바꿈 = 지금 방 이름으로 들고오자
// 플레이어 나가기 하면 db에서 제거 플레이어 둘다 없으면
// 방 만들기 증가하는 id로 웹소켓 연결
// 


function StartGame() {
    let user_id = payload['user_id']
    const game_id = localStorage.getItem('room_name');
    console.log("game_id",game_id)
    $.ajax({
        type: 'put',
        url: `${hostUrl}/chess/`,
        data: {"user_id":user_id,"game_id":game_id},
        success: function (response) {
            console.log("reponse:", response)
            if(response.ready_state==="game_start"){
                let board_state=response.board_state
                console.log("gamestart: ", board_state)
                localStorage.setItem('board', JSON.stringify(board_state))
                const board = localStorage.getItem('board')
                console.log("board", board)
                
                $('#start_game').hide()
                const chessBoardTable = createChessBoardTable(board_state);
                const chessBoardContainer = document.getElementById('board_state');
                chessBoardContainer.appendChild(chessBoardTable);
            }else if (response.ready_state === "player_1_True") {
                let buttonElement = document.getElementById("ready_button");
                buttonElement.style.backgroundColor = "skyblue";
                buttonElement.innerText = "준비완료";
            } else if (response.ready_state === "player_2_True") {
                let buttonElement = document.getElementById("ready_button");
                buttonElement.style.backgroundColor = "skyblue";
                buttonElement.innerText = "준비완료";
            } else if (response.ready_state === "player_1_False") {
                let buttonElement = document.getElementById("ready_button");
                buttonElement.style.backgroundColor = "pink";
                buttonElement.innerText = "준비하기";
            } else if (response.ready_state === "player_2_False") {
                let buttonElement = document.getElementById("ready_button");
                buttonElement.style.backgroundColor = "pink";
                buttonElement.innerText = "준비하기";            }

        },
    });
}

function MoveHorse() {
    // var board_state=response.board_state
    var horseInputDom = document.querySelector('#horse_input');
    // localStorage.setItem('board', JSON.stringify(board_state))
    const board = localStorage.getItem('board')
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
        console.log('board',board)
        chatSocket.send(JSON.stringify({
            'horse':horse,
            'type': 'horse',
            // 'user_id': payload['user_id'],
            'board':board
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

function createChessBoardTable(boardData) {
    const table = document.createElement('board_state');

    for (const row of boardData) {
        const tr = document.createElement('tr');
        for (const cell of row) {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}

function drawBoard(boardData) {
    const boardElement = document.getElementById('board_state');

    for (let row = 0; row < 8; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';

        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            
            const pieceCode = boardData[row][col];
            const pieceImg = document.createElement('img');
            pieceImg.src = `images/${pieceCode}.png`; // 이미지 경로 설정

            square.appendChild(pieceImg);
            rowElement.appendChild(square);
        }

        boardElement.appendChild(rowElement);
    }
}