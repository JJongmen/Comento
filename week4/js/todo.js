// 할 일 목록을 화면에 추가하는 함수
function displayTodoItem(item) {
    const todoList = document.getElementById('todo-list');

    const todoItem = document.createElement('li');
    const todoText = document.createElement('span');
    todoText.textContent = item.todo;
    todoItem.appendChild(todoText);

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.addEventListener('click', function() {
        // 1. HTML 내용에 빗금표 치기
        todoText.style.textDecoration = 'line-through';
        completeButton.disabled = true;

        // 2. 서버에 완료했다는 정보 보내기
        fetch(`https://port-0-todolist-server-eu1k2lll3di417.sel3.cloudtype.app/api/todos/${item.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
            },
            body: JSON.stringify({
                completed: true,
                completed_at: new Date().toISOString() // 현재 날짜와 시간
            })
        })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Server response was not OK');
            }
        })
        .catch(error => {
            console.error('Error marking todo as completed:', error);
        });
    });
    todoItem.appendChild(completeButton);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function() {
        // 서버에서 해당 항목 삭제
        fetch(`https://port-0-todolist-server-eu1k2lll3di417.sel3.cloudtype.app/api/todos/${item.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
            }
        })
        .then(response => {
            if (response.status === 204) {  
                todoList.removeChild(todoItem);
            } else {
                throw new Error('Server response was not OK');
            }
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
        });
    });

    todoItem.appendChild(todoText);
    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);

    // 오늘 날짜와 완료 날짜 비교
    const today = new Date().toDateString();
    if (item.completed && new Date(item.completed_at).toDateString() === today) {
        todoText.style.textDecoration = 'line-through';
        completeButton.disabled = true;
    }
}

// 페이지가 로드될 때 '할 일' 목록을 가져오는 함수
function fetchTodos() {
    fetch('https://port-0-todolist-server-eu1k2lll3di417.sel3.cloudtype.app/api/todos/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            displayTodoItem(item);
        });
    })
    .catch(error => {
        console.error('Error fetching todos:', error);
    });
}

// 새로운 '할 일'을 추가하는 함수
function addTodo() {
    const newTodo = document.getElementById('new-todo').value;

    fetch('https://port-0-todolist-server-eu1k2lll3di417.sel3.cloudtype.app/api/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
        },
        body: JSON.stringify({
            todo: newTodo
        })
    })
    .then(response => response.json())
    .then(data => {
        displayTodoItem(data);
        document.getElementById('new-todo').value = '';  // 입력 필드 초기화
    })
    .catch(error => {
        console.error('Error adding todo:', error);
    });
}

// 페이지가 로드될 때 '할 일' 목록을 처음으로 가져옵니다.
fetchTodos();
