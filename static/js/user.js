async function handleLogin() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch(`${hostUrl}/user/api/token/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    // console.log(response.json())
    if (response.status === 200) {
        const response_json = await response.json()

        console.log(response_json["access"])

        localStorage.setItem('access', response_json.access)
        localStorage.setItem('refresh', response_json.refresh)

        console.log(123,response.json())
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem('payload', jsonPayload)
        localStorage.setItem('chess', JSON.stringify({}));


        window.location.href = "/chat/index.html"

    } else if (response.status === 401){
        alert('아이디, 비밀번호를 확인해 주세요.')
    }
}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}