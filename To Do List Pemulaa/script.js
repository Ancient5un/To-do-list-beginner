    // Ambil element dari HTML
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks saat pertama kali buka
    document.addEventListener('DOMContentLoaded', loadTasks);

    // Fungsi untuk menambahkan task
    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() === '') {
            alert('Please enter a task');
            return;
        }

        addTaskToDOM(taskInput.value.trim());
        saveTasks(); // Simpan ke localStorage
        taskInput.value = '';
    });

    // Simpan Task ke local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(task => {
            tasks.push({
                text: task.querySelector('span').textContent,
                completed: task.querySelector('.task-checkbox').checked // Fix typo: chacked -> checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load task dari local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Fix typo: localStotrage -> localStorage
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed); // Fix typo: complated -> completed
        });
    }

    // Tambah task ke DOM
    function addTaskToDOM(taskText, isCompleted = false) { // Fix typo: addEventListener -> addTaskToDOM
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        taskList.appendChild(taskItem);

        // Event listener untuk checkbox
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', saveTasks);

        // Event listener untuk tombol delete
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            saveTasks();
        });
    }