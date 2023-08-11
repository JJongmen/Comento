function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerElement = document.createElement('header');
            headerElement.innerHTML = data;

            // 토큰의 유무를 확인하여 로그인 상태를 판단
            if (localStorage.getItem('Authorization')) {
                // 로그인 된 경우
                const loginLink = headerElement.querySelector('a[href="login.html"]');
                const signupLink = headerElement.querySelector('a[href="signup.html"]');
                
                // 로그인 및 회원가입 링크 제거
                loginLink.remove();
                signupLink.remove();

                // 로그아웃 버튼 추가
                const logoutButton = document.createElement('a');
                logoutButton.textContent = '로그아웃';
                logoutButton.href = '#';
                logoutButton.addEventListener('click', function() {
                    localStorage.removeItem('Authorization'); // 토큰 삭제
                    location.reload(); // 페이지 새로고침
                });

                headerElement.querySelector('nav').appendChild(logoutButton);
            }

            // body 첫 번째 자식으로 header 추가
            document.body.insertBefore(headerElement, document.body.firstChild);
        })
        .catch(error => {
            console.error('Error fetching the header:', error);
        });
}

loadHeader();
