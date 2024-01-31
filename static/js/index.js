// const hostUrl = "http://127.0.0.1:8000"

function ChatRoom() {
    console.log("누름")
    const room_name = document.getElementById("room_input").value

    localStorage.setItem('room_name',room_name);
    window.location.href = "/chat/room.html"
};
