function isValidPassword(password) {
    // 최소 8자 이상
    if (password.length < 8) {
        alert("비밀번호는 최소 8자 이상이어야 합니다.");
        return false;
    }
    
    // 숫자 포함 확인
    if (!/\d/.test(password)) {
        alert("비밀번호에는 숫자가 포함되어야 합니다.");
        return false;
    }
    
    // 흔히 사용하는 비밀번호 목록
    const commonPasswords = ["password", "12345678", "qwerty"];
    if (commonPasswords.includes(password)) {
        alert("너무 흔히 사용되는 비밀번호입니다. 다른 비밀번호를 선택해주세요.");
        return false;
    }

    return true;
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 form 제출 동작 방지

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 비밀번호 유효성 검사
    if (!isValidPassword(password)) {
        return; // 유효하지 않은 비밀번호인 경우 요청 중단
    }

    fetch('https://port-0-todolist-server-eu1k2lll3di417.sel3.cloudtype.app/api/auth/users/', {
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
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Server response was not OK');
        }
    })
    .then(data => {
        alert('회원가입이 성공적으로 완료되었습니다.');
        window.location.href = 'login.html';  // 회원가입이 성공하면 로그인 화면으로 리디렉션
    })
    .catch(error => {
        console.error('Error:', error);
        alert('회원가입 중 오류가 발생했습니다.');
    });
});
