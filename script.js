let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    document.getElementById('add-task').addEventListener('click', addTask);
});

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-content ${task.completed ? 'completed' : ''}">
                <input type="text" class="task-text" value="${task.text}" onchange="updateTask(${index}, this.value)" />
                <small>${task.date}</small>
            </div>
            <button class="complete" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete" onclick="deleteTask(${index})">🗑️</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const text = taskInput.value.trim();
    if (!text) return alert('Task cannot be empty!');
    
    const date = taskDate.value || new Date().toISOString().slice(0, 16);
    tasks.push({ text, date, completed: false });
    updateLocalStorage();
    taskInput.value = '';
    taskDate.value = '';
    renderTasks();
}

function updateTask(index, newText) {
    if (newText.trim() === '') return;
    tasks[index].text = newText.trim();
    updateLocalStorage();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
