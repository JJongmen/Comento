document.addEventListener('DOMContentLoaded', function() {
    fetchRankings();
});

function fetchRankings() {
    fetch('https://port-0-todolist-server-eu1k2lll3di417.sel3.cloudtype.app/api/todos/ranking/completions/')
        .then(response => response.json())
        .then(data => {
            displayRankings(data);
        })
        .catch(error => {
            console.error('Error fetching rankings:', error);
        });
}

function displayRankings(data) {
    const taskCompletionRankingList = document.getElementById('task-completion-ranking');

    data.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username}: ${user.completed_tasks_count}개 완료`;
        taskCompletionRankingList.appendChild(listItem);
    });
}
