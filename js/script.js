console.log('Happy developing ✨');

let tasksContainer = document.querySelector('.tasks');

let _tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(name, description, status) {
    tasks.push({ name, description, status, id: tasks.length+1 });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(_tasks);
}
loadTasks(_tasks);

document.getElementById('addTaskbtn').addEventListener('click',()=>{
    let modal = document.getElementById('modal');
    modal.innerHTML = ``;
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-window">
            <h2>Редагування задачі</h2>
    
            <label>Назва</label>
            <label>Id: ${tasks.length+1}</label>
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

    // Збереження задачі
    document.getElementById('saveTask').addEventListener('click', () => {
        let name = document.getElementById('editName').value;
        let desc = document.getElementById('editDesc').value;
        let status = document.getElementById('editStatus').value;
        let id = tasks.length+1;
        addTask(name, desc, status, id);
        modal.style.display = 'none';
    });

} );

function loadTasks(tasks) {
    tasksContainer.innerHTML = '';
    if(tasks.length === 0){
        console.log('No tasks found.');
    }
    let id = 0;
    tasks.forEach((task) => {
        console.log(task.name, task.description, task.status);
        tasksContainer.innerHTML += `
        <div class="task-card">
            <div class="task-status ${task.status}">${task.status}</div>
            <div class="task-title">${task.name}</div>
            <div class="task-desc">${task.description}</div>
            <div class="task-desc">${task.id}</div>

            <button class="edit-btn" data-id="${task.id}">Редагувати</button>
        </div>
        `;
        id++;
        document.querySelectorAll('.edit-btn').forEach((el) =>{
            el.addEventListener('click', (e)=>{
                let modal = document.getElementById('modal');
                modal.innerHTML = ``;
                modal.style.display = 'flex';
                let id = parseInt(e.target.dataset.id);
                const index = tasks.findIndex(task => task.id === id);
                let task = tasks[index];
                modal.innerHTML = `
         <div class="modal-window">
            <h2>Редагування задачі</h2>
    
            <label>Назва</label>
            <label>Id: ${id}</label>
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
                <button id="deleteTask">Delete</button>

            </div>
        </div>
        `;
                document.getElementById('editName').value = task.name;
                document.getElementById('editDesc').value = task.description;
                document.getElementById('editStatus').value = task.status;
                document.getElementById('closeModal').addEventListener('click', () => {
                    modal.style.display = 'none';
                });
                document.getElementById('saveTask').addEventListener('click', () => {tasks[index].name = document.getElementById('editName').value;
                    tasks[index].name = document.getElementById('editName').value;
                    tasks[index].description = document.getElementById('editDesc').value;
                    tasks[index].status = document.getElementById('editStatus').value;
                    modal.style.display = 'none';
                    loadTasks(_tasks);

                });
                document.getElementById('deleteTask').addEventListener('click', () => {
                    deleteTask(tasks[index].id);
                    modal.style.display = 'none';
                });



            });

        });
    });
}



function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}



document.getElementById('taskInput').addEventListener('input', (e) => {
    if(e.target.value.length > 3) {
        let res = [];
        _tasks.forEach((task) => {
            if(task.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                res.push(task);
            }
        })
        loadTasks(res);
    }
    else{
        loadTasks(_tasks);

    }
})

