// Selecting the needed DOM elements
const button = document.querySelector('.btn');              // Submit button                 
const displayDiv = document.querySelector('.displayTask');  // Container for displaying tasks
const input = document.querySelector('.todoInput');         // Text input field
const clearBtn = document.querySelector('.clearBtn');       // Clear All button

// When the page loads, get todos from localStorage and display them
window.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach((todo) => {
        // Show each todo that was stored
        addTodoFromStorage(todo.text, todo.completed);
    });

    // If there are any todos, show the clear button
    if (todos.length > 0) {
        showClearButton();
    }
});


// When user clicks the "Add" button
button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents form from submitting and refreshing the page
    if (input.value.trim()) {   // Only add if input is not empty
        addTodo(input);
        showClearButton();
    }
})

// Also allow adding task with Enter key
input.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' && input.value.trim()) {
        addTodo(input);
        showClearButton();
    }

})

// Clear all tasks when clear button is clicked
clearBtn.addEventListener('click', () => {
    displayDiv.innerHTML = '';              // Remove all tasks from display
    clearBtn.style.display = 'none';        // Hide the clear button
    localStorage.removeItem('todos');       // Remove all saved todos
})

// Check if user clicks checkbox or delete button
displayDiv.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
        checkTodo(e.target);    // Toggle completed class when checkbox is clicked

    } else if (e.target.classList.contains('deleteBtn')) {
        deleteTodo(e.target);   // Delete that specific task
    }
})


// Function to add a new task to the display and save to localStorage
const addTodo = (input) => {

    // Create elements
    const wrapper = document.createElement('div');
    const todoDisplay = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteBtn = document.createElement('button');
    const line = document.createElement('hr');


    // Assign classes and properties
    todoDisplay.classList.add('todoDisplay');
    checkbox.classList.add('checkbox');
    checkbox.type = 'checkbox';
    deleteBtn.classList.add('deleteBtn');

    label.innerText = input.value;      // Set label text to the input value
    deleteBtn.innerText = 'x';          // Delete button text

    // Put everything in the DOM
    wrapper.appendChild(todoDisplay);
    todoDisplay.appendChild(checkbox);
    todoDisplay.appendChild(label);
    todoDisplay.appendChild(deleteBtn);
    wrapper.appendChild(line);
    displayDiv.appendChild(wrapper);

    input.value = '';       // Clear input field
    input.blur();
    // Save the new todo to localStorage
    saveTodoLocal(label.innerText, checkbox.checked);
}


// Show the "Clear All" button
const showClearButton = () => {
    clearBtn.style.display = 'block';
}


// When a checkbox is clicked, toggle the completed class on the label
const checkTodo = (checked) => {
    checked.nextElementSibling.classList.toggle('completed');
    updateLocalStorage();       // Update saved data after change
}

// When delete button is clicked, remove that task
const deleteTodo = (dltBtn) => {
    const wrapper = dltBtn.closest('div').parentElement;    // Find the outer wrapper of the task
    wrapper.remove();       // Remove from DOM
    updateLocalStorage();   // Update localStorage
}


// Save a new task to localStorage
const saveTodoLocal = (text, completed) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];    // Get existing todos or make empty array
    todos.push({ text: text, completed: completed });               // Add new task to array
    localStorage.setItem('todos', JSON.stringify(todos));           // Save back to localStorage
}


// When loading from storage, add task to the display
const addTodoFromStorage = (text, completed) => {

    // Create all necessary elements
    const wrapper = document.createElement('div');
    const todoDisplay = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteBtn = document.createElement('button');
    const line = document.createElement('hr');

    // Set properties and content
    todoDisplay.classList.add('todoDisplay');
    checkbox.classList.add('checkbox');
    checkbox.type = 'checkbox';
    deleteBtn.classList.add('deleteBtn');

    label.innerText = text;
    deleteBtn.innerText = 'x';

    // If it was completed earlier, show it as checked and styled
    if(completed) {
        checkbox.checked = true;
        label.classList.add('completed');
    }

    // Add all to the DOM
    wrapper.appendChild(todoDisplay);
    todoDisplay.appendChild(checkbox);
    todoDisplay.appendChild(label);
    todoDisplay.appendChild(deleteBtn);
    wrapper.appendChild(line);
    displayDiv.appendChild(wrapper);

}


// This updates localStorage based on current UI state
const updateLocalStorage = () => {

    const allTodos = [];        // We'll collect all tasks
    const todoItems = displayDiv.querySelectorAll('.todoDisplay');

    todoItems.forEach((item) => {
        const checkbox = item.querySelector('.checkbox');
        const label = item.querySelector('label');

        // Add each task's text and whether it's checked
        allTodos.push({
            text: label.innerText,
            completed: checkbox.checked
        });
    })
    
    // Save the whole updated array
    localStorage.setItem('todos', JSON.stringify(allTodos));
}