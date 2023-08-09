function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerElement = document.createElement('footer'); // Create a footer element
            footerElement.innerHTML = data;
            
            // body 맨 뒤에 footer 추가
            document.body.appendChild(footerElement);
        })
        .catch(error => {
            console.error('Error fetching the footer:', error);
        });
}

loadFooter();