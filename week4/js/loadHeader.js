function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerElement = document.createElement('header');
            headerElement.innerHTML = data;
            
            // body 첫 번째 자식으로 header 추가
            document.body.insertBefore(headerElement, document.body.firstChild);
        })
        .catch(error => {
            console.error('Error fetching the header:', error);
        });
}

loadHeader();
