console.log('Happy developing ✨');

let tasksContainer = document.querySelector('.tasks');

// 🔥 ЄДИНИЙ масив задач
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Додавання задачі
function addTask(name, description, status) {
    tasks.push({ name, description, status, id: tasks.length + 1 });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(tasks);
}

loadTasks(tasks);

// ------------------------------
// ДОДАВАННЯ НОВОЇ ЗАДАЧІ
// ------------------------------
document.getElementById('addTaskbtn').addEventListener('click', () => {
    let modal = document.getElementById('modal');
    modal.innerHTML = "";
    modal.style.display = 'flex';

    modal.innerHTML = `
        <div class="modal-window">
            <h2>Створення задачі</h2>

            <label>Назва</label>
            <label>ID: ${tasks.length + 1}</label>
            <input type="text" id="editName">

            <label>Опис</label>
            <textarea id="editDesc"></textarea>

            <label>Статус</label>
            <select id="editStatus">
                <option value="done">Виконано</option>
                <option value="not-done">Не виконано</option>
                <option value="progress">В процесі</option>
            </select>

            <div class="modal-actions">
                <button id="saveTask">Зберегти</button>
                <button id="closeModal">Закрити</button>
            </div>
        </div>
    `;

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('saveTask').addEventListener('click', () => {
        let name = document.getElementById('editName').value;
        let desc = document.getElementById('editDesc').value;
        let status = document.getElementById('editStatus').value;

        addTask(name, desc, status);
        modal.style.display = 'none';
    });
});

// ------------------------------
// РЕНДЕР ЗАДАЧ
// ------------------------------
function loadTasks(list) {
    tasksContainer.innerHTML = '';

    list.forEach((task) => {
        tasksContainer.innerHTML += `
            <div class="task-card">
                <div class="task-status ${task.status}">${task.status}</div>
                <div class="task-title">${task.name}</div>
                <div class="task-desc">${task.description}</div>
                <div class="task-desc">${task.id}</div>

                <button class="edit-btn" data-id="${task.id}">Редагувати</button>
            </div>
        `;
    });

    // Додаємо обробники на кнопки редагування
    document.querySelectorAll('.edit-btn').forEach((el) => {
        el.addEventListener('click', openEditModal);
    });
}

// ------------------------------
// РЕДАГУВАННЯ ЗАДАЧІ
// ------------------------------
function openEditModal(e) {
    let modal = document.getElementById('modal');
    modal.innerHTML = "";
    modal.style.display = 'flex';

    let id = Number(e.target.dataset.id);
    const index = tasks.findIndex(task => task.id === id);
    let task = tasks[index];

    modal.innerHTML = `
        <div class="modal-window">
            <h2>Редагування задачі</h2>

            <label>Назва</label>
            <label>ID: ${id}</label>
            <input type="text" id="editName">

            <label>Опис</label>
            <textarea id="editDesc"></textarea>

            <label>Статус</label>
            <select id="editStatus">
                <option value="done">Виконано</option>
                <option value="not-done">Не виконано</option>
                <option value="progress">В процесі</option>
            </select>

            <div class="modal-actions">
                <button id="saveTask">Зберегти</button>
                <button id="deleteTask">Видалити</button>
                <button id="closeModal">Закрити</button>
            </div>
        </div>
    `;

    // Заповнюємо поля
    document.getElementById('editName').value = task.name;
    document.getElementById('editDesc').value = task.description;
    document.getElementById('editStatus').value = task.status;

    // Закрити
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Зберегти
    document.getElementById('saveTask').addEventListener('click', () => {
        tasks[index].name = document.getElementById('editName').value;
        tasks[index].description = document.getElementById('editDesc').value;
        tasks[index].status = document.getElementById('editStatus').value;

        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(tasks);
        modal.style.display = 'none';
    });

    // Видалити
    document.getElementById('deleteTask').addEventListener('click', () => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(tasks);
        modal.style.display = 'none';
    });
}

// ------------------------------
// ПОШУК
// ------------------------------
document.getElementById('taskInput').addEventListener('input', (e) => {
    let text = e.target.value.toLowerCase();

    if (text.length > 3) {
        let res = tasks.filter(task => task.name.toLowerCase().includes(text));
        loadTasks(res);
    } else {
        loadTasks(tasks);
    }
});
