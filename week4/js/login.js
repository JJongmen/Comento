document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 form 제출 동작 방지

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8000/api/auth/jwt/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Server response was not OK');
        }
    })
    .then(data => {
        const accessToken = data.access;
        localStorage.setItem('Authorization', accessToken); // JWT 토큰을 localStorage에 저장

        window.location.href = 'todo.html'; // 페이지 리다이렉트
    })
    .catch(error => {
        console.error('Error:', error);
        alert('로그인 중 오류가 발생했습니다.');
    });
});
