// const hostUrl = "http://127.0.0.1:8000"
// const user_id = localStorage.getItem('user_id');
const user_id = payload['user_id']
console.log("user_id : ", user_id)

//방번호 입력으로 방 들어가기
function ChatRoom() {
    console.log("click join")
    const room_name = document.getElementById("room_input").value

    localStorage.setItem('room_name',room_name);
    window.location.href = "/chat/room.html"
};

// 랭크로 상대찾기
function RankGame() {
    console.log("click rank")

    localStorage.setItem('room_name',room_name);
    window.location.href = "/chat/room.html"
};

// 방만들기 하면 체스로그 만들고 id 가져와서 챗에 바로 연결
// 완
function MakeGame() {
    let user_id = payload['user_id']
    $.ajax({
        type: 'post',
        url: `${hostUrl}/chess/`,
        data: {"user_id":user_id},
        success: function (response) {
            let board_state=response.board_state
            let room_name=response.game_id
            console.log("reponse:", response)
            console.log("reponse:", response.game_id)
            console.log("gamestart: ", board_state)
            localStorage.setItem('board', JSON.stringify(board_state))
            localStorage.setItem('room_name',room_name);
            const board = localStorage.getItem('board')
            console.log("board", board)
            window.location.href = "/chat/room.html"
        },
    });
    };

// 참고용
function StartGame2() {
    let user_id = payload['user_id']
    $.ajax({
        type: 'post',
        url: `${hostUrl}/chess/`,
        data: {"user_id":user_id},
        success: function (response) {
            let board_state=response.board_state
            console.log("reponse:", response)
            console.log("gamestart: ", board_state)
            localStorage.setItem('board', JSON.stringify(board_state))
            const board = localStorage.getItem('board')
            console.log("board", board)
        },
    });
}