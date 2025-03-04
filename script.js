let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <div class="task-content ${task.completed ? 'completed' : ''}">
        <span>${task.text}</span>
        <small>${task.date}</small>
      </div>
      <div class="task-buttons">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="complete" onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const text = taskInput.value.trim();
  if (text) {
    const date = taskDate.value || new Date().toISOString().slice(0, 16);
    tasks.push({ text, date, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    taskDate.value = '';
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  document.getElementById('add-task').addEventListener('click', addTask);
});