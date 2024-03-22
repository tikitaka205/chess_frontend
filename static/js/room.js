// const roomName = JSON.parse(document.getElementById('room-name').textContent);
// const goodsId = url.searchParams.get('room_name');
const token = localStorage.getItem('access');

var host="127.0.0.1:8000"

let recognition; // 음성 인식 객체를 전역 변수로 선언
let isRecognizing = false; // 음성 인식 중인지 여부를 나타내는 변수
let lastTranscript; // 마지막으로 인식된 텍스트를 저장할 변수

// document.body.onkeyup = function(e){
//     if(e.keyCode == 32){
//         console.log("click space")
//         if (!isRecognizing) {
//             startSpeechRecognition(); // 음성 인식 시작
//             isRecognizing = true;
//         } else {
//             stopSpeechRecognition(); // 음성 인식 중지
//             isRecognizing = false;
//             console.log('마지막으로 인식된 텍스트:', lastTranscript);
//             MoveHorse(lastTranscript);
//         }
//     }
// };

// // 음성인식 시작
// function startSpeechRecognition() {
//     recognition = new webkitSpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';
    
//     recognition.onstart = function() {
//         console.log('음성 인식이 시작되었습니다.');
//     };

//     recognition.onresult = function(event) {
//         var transcript = event.results[0][0].transcript;
//         console.log('인식된 텍스트:', transcript);
//         lastTranscript = transcript; // 마지막으로 인식된 텍스트를 저장합니다.
//     };

//     recognition.onerror = function(event) {
//         console.error('음성 인식 오류:', event.error);
//     };

//     recognition.start();
// }

// // 음성인식 중지
// function stopSpeechRecognition() {
//     recognition.stop();
//     console.log('음성 인식이 중지되었습니다.');
// }
// 구글 음성인식
/** Performs microphone streaming speech recognition with a duration of 1 minute. */
// public static void streamingMicRecognize() throws Exception {

//     ResponseObserver<StreamingRecognizeResponse> responseObserver = null;
//     try (SpeechClient client = SpeechClient.create()) {
  
//       responseObserver =
//           new ResponseObserver<StreamingRecognizeResponse>() {
//             ArrayList<StreamingRecognizeResponse> responses = new ArrayList<>();
  
//             public void onStart(StreamController controller) {}
  
//             public void onResponse(StreamingRecognizeResponse response) {
//               responses.add(response);
//             }
  
//             public void onComplete() {
//               for (StreamingRecognizeResponse response : responses) {
//                 StreamingRecognitionResult result = response.getResultsList().get(0);
//                 SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
//                 System.out.printf("Transcript : %s\n", alternative.getTranscript());
//               }
//             }
  
//             public void onError(Throwable t) {
//               System.out.println(t);
//             }
//           };
  
//       ClientStream<StreamingRecognizeRequest> clientStream =
//           client.streamingRecognizeCallable().splitCall(responseObserver);
  
//       RecognitionConfig recognitionConfig =
//           RecognitionConfig.newBuilder()
//               .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
//               .setLanguageCode("en-US")
//               .setSampleRateHertz(16000)
//               .build();
//       StreamingRecognitionConfig streamingRecognitionConfig =
//           StreamingRecognitionConfig.newBuilder().setConfig(recognitionConfig).build();
  
//       StreamingRecognizeRequest request =
//           StreamingRecognizeRequest.newBuilder()
//               .setStreamingConfig(streamingRecognitionConfig)
//               .build(); // The first request in a streaming call has to be a config
  
//       clientStream.send(request);
//       // SampleRate:16000Hz, SampleSizeInBits: 16, Number of channels: 1, Signed: true,
//       // bigEndian: false
//       AudioFormat audioFormat = new AudioFormat(16000, 16, 1, true, false);
//       DataLine.Info targetInfo =
//           new Info(
//               TargetDataLine.class,
//               audioFormat); // Set the system information to read from the microphone audio stream
  
//       if (!AudioSystem.isLineSupported(targetInfo)) {
//         System.out.println("Microphone not supported");
//         System.exit(0);
//       }
//       // Target data line captures the audio stream the microphone produces.
//       TargetDataLine targetDataLine = (TargetDataLine) AudioSystem.getLine(targetInfo);
//       targetDataLine.open(audioFormat);
//       targetDataLine.start();
//       System.out.println("Start speaking");
//       long startTime = System.currentTimeMillis();
//       // Audio Input Stream
//       AudioInputStream audio = new AudioInputStream(targetDataLine);
//       while (true) {
//         long estimatedTime = System.currentTimeMillis() - startTime;
//         byte[] data = new byte[6400];
//         audio.read(data);
//         if (estimatedTime > 60000) { // 60 seconds
//           System.out.println("Stop speaking.");
//           targetDataLine.stop();
//           targetDataLine.close();
//           break;
//         }
//         request =
//             StreamingRecognizeRequest.newBuilder()
//                 .setAudioContent(ByteString.copyFrom(data))
//                 .build();
//         clientStream.send(request);
//       }
//     } catch (Exception e) {
//       System.out.println(e);
//     }
//     responseObserver.onComplete();
//   }

//구글 음성인식
// function transcribeAudio(audioFile) {
//     const apiUrl = 'https://speech.googleapis.com/v1/speech:recognize?key=' + apiKey;

//     // 오디오 파일을 Blob으로 변환
//     const blob = new Blob([audioFile], { type: 'audio/wav' });

//     // HTTP 요청 생성
//     const formData = new FormData();
//     formData.append('audio', blob);

//     // HTTP POST 요청
//     fetch(apiUrl, {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         // 변환된 텍스트 출력
//         console.log('Transcription result:', data.results[0].alternatives[0].transcript);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

// 방 입장시 룸이름 설정하고 바로 웹소켓 연결
if(localStorage.getItem('room_name')){
    var room_name = localStorage.getItem('room_name')
    $('#room_number').append("room :",room_name)

   }
// const roomName=Response.data
console.log(room_name)
console.log(payload)
// console.log("user_id", payload["user_id"])

// create websocket use room_name
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
    let player = localStorage.getItem('player');
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
    // 여기서 보여주는 데이터 변경가능
    if (type === 'board_state') {
        $('#board_state *').remove()
        $('#ready_button').remove()
        // localStorage.clear()
        // console.log("local clear")
        localStorage.setItem('board', JSON.stringify(board_state))
        // console.log("local set new board")
        if (player==="player_2"){
        let reversedChessBoard = reverseBoard(board_state);
        const chessBoardTable = createChessBoardTable(reversedChessBoard);
        const chessBoardContainer = document.getElementById('board_state');
        chessBoardContainer.appendChild(chessBoardTable);
        }else{
            const chessBoardTable = createChessBoardTable(board_state);
            const chessBoardContainer = document.getElementById('board_state');
            chessBoardContainer.appendChild(chessBoardTable);
        }

        $('#alarm *').remove()
        let temp_html = `
        <div style=" margin: 5px 20px 5px 20px;"> ${alarm} </div>
        `
        $('#alarm').append(temp_html)
        readTextOutLoud(alarm);
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

// console.log("MoveHorse", horse)
// if (chatSocket.readyState === WebSocket.OPEN) {
//     console.log('opened')
//     console.log('board',board)
//     chatSocket.send(JSON.stringify({
//         'horse':horse,
//         'type': 'horse',
//         // 'user_id': payload['user_id'],
//         'board':board
//     }))
// }

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
                console.log("player_2",board_state)
                const chessBoardTable = createChessBoardTable(board_state);
                const chessBoardContainer = document.getElementById('board_state');
                chessBoardContainer.appendChild(chessBoardTable);

                //게임시작 성공이면 이걸 요청함
                if (chatSocket.readyState === WebSocket.OPEN) {
                    chatSocket.send(JSON.stringify({
                        'type': 'start',
                        'board':board_state,
                        'user_id':user_id,
                    }))
                }

                console.log("gamestart: ", board_state)
                localStorage.setItem('board', JSON.stringify(board_state))
                localStorage.setItem('player', response.player)
                const board = localStorage.getItem('board')
                console.log("board", board)
                
                $('#start_game').hide()

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

//
function MoveHorse(str) {
    // console.log("str:",str)
    // var board_state=response.board_state
    var horseInputDom = document.querySelector('#horse_input');
    console.log(horseInputDom)
    // localStorage.setItem('board', JSON.stringify(board_state))
    const board = localStorage.getItem('board')
    // const player = localStorage.getItem('player')
    var horse_input;
    if (str) {
        horse_input = str;
    } else if (horseInputDom) {
        horse_input = horseInputDom.value;
    } else {
        console.error('No input provided.');
        return;
    }
    console.log("horse_input 정하기",horse_input)
    const horse=MoveHorseFunc(horse_input)
    console.log("MoveHorse", horse)
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
        setTimeout(MoveHorse)
    }
    horseInputDom.value = '';
};

function MoveHorseFunc(position) {
    const result = [];
    const player = localStorage.getItem('player');
    console.log(player)
    // const fromSquare = position.slice(0, 2); // 출발 위치
    // const toSquare = position.slice(3); // 도착 위치
    // const piece = position.charAt(2).toUpperCase(); // 말의 종류, 대문자로 변환
    
    let playerSymbol;
    if (player === 'player_1') {
        const fromSquare = position.slice(0, 2); // 출발 위치
        const toSquare = position.slice(3); // 도착 위치
        const piece = position.charAt(2).toUpperCase(); // 말의 종류, 대문자로 변환
        playerSymbol = 'w'; // 플레이어 1은 'w'
        result.push(toSquare);

        console.log(result)
        // 플레이어에 따라 말의 종류를 추가
        result.splice(0, 0, `${fromSquare}${playerSymbol}${piece}`);
        console.log(result)
        const resultStr = result.map(item => `'${item}'`).join(',');
        console.log("=====",resultStr);
        return resultStr;
    } else {
        position=reverseChessMove(position)
        console.log("position",position)
        const fromSquare = position.slice(0, 2); // 출발 위치
        const toSquare = position.slice(3); // 도착 위치
        const piece = position.charAt(2).toUpperCase(); // 말의 종류, 대문자로 변환
        playerSymbol = 'b'; // 플레이어 2는 'b'
        result.push(toSquare);

        console.log(result)
        // 플레이어에 따라 말의 종류를 추가
        result.splice(0, 0, `${fromSquare}${playerSymbol}${piece}`);
        console.log(result)
        const resultStr = result.map(item => `'${item}'`).join(',');
        console.log("=====",resultStr);
        return resultStr;
    }
}

//반전된 인풋값을 알아내는 함수
function reverseChessMove(str) {
    const first = str.charAt(0); // 출발 위치
    const second = str.charAt(1); // 목적 위치
    const center=str.charAt(2)
    const third=str.charAt(3)
    const fourth=str.charAt(4)

    const alphaMap = { 'a': 'h', 'b': 'g', 'c': 'f', 'd': 'e', 'e': 'd', 'f': 'c', 'g': 'b', 'h': 'a' };
    const numMap = { '1': '8', '2': '7', '3': '6', '4': '5', '5': '4', '6': '3', '7': '2', '8': '1' };

    const firststr = alphaMap[first];
    const secondstr = numMap[second];
    const thirdstr = alphaMap[third];
    const fourthstr = numMap[fourth];

    return firststr + secondstr + center + thirdstr + fourthstr;
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
// function MoveHorse2() {

//     $.ajax({
//         type: 'post',
//         url: `${hostUrl}/goods/${goodsId}`,
//         data: {},
//         success: function (response) {
//             console.log("review get: ", response)
//             let user_id = payload['user_id']
//             let seller_id = response['seller']['id']
//             if (user_id == seller_id) {
//                 window.location.href = `/review/seller.html?goods_id=${goodsId}`
//             } else {
//                 window.location.href = `/review/buyer.html?goods_id=${goodsId}`
//             }
//         },
//     });
// }

// function GetHorse() {

//     $.ajax({
//         type: 'post',
//         url: `${hostUrl}/goods/${goodsId}`,
//         data: {user_id:user_id},
//         success: function (response) {
//             console.log("review get: ", response)
//             let user_id = payload['user_id']
//             let seller_id = response['seller']['id']
//             if (user_id == seller_id) {
//                 window.location.href = `/review/seller.html?goods_id=${goodsId}`
//             } else {
//                 window.location.href = `/review/buyer.html?goods_id=${goodsId}`
//             }
//         },
//     });
// }


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

function readTextOutLoud(text) {
    // SpeechSynthesis 객체 생성
    var synth = window.speechSynthesis;

    
    // 음성 합성할 텍스트 생성
    var utterance = new SpeechSynthesisUtterance(text);
    
    // 음성 합성 속도 설정 (기본값은 1)
    utterance.rate = 0.5; // 음성 합성 속도를 빠르게 설정
    utterance.lang = 'ja-JP';
    
    // 음성 합성 시작
    synth.speak(utterance);
}

function reverseBoard(board) {
    let reversedBoard = board.slice().reverse().map(row => row.slice().reverse());
    return reversedBoard;
}