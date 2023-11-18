// Form and space where the tasks will be displayed are selected
const form=document.querySelector('#form');
const list=document.querySelector('#tasks-list');

// Array of tasks is declared
let tasks=[];

// Functions

eventListeners();

function eventListeners(){
    // When the form is submitted, the addTask function is executed
    form.addEventListener('submit', addTask)

    // When the document is loaded, the createHTML function is executed
    document.addEventListener('DOMContentLoaded', ()=>{

        // Tasks is obtained from local storage or created if there is none
        tasks=JSON.parse(localStorage.getItem('Tasks')) || [];

        // Function to create HTML is executed
        createHTML();
    })
}

function addTask(e){
    e.preventDefault();
    // Textarea value is obtained (task that the user wants to add)
    const task=document.querySelector('#description').value;

    // If the user does not enter a task, an error is displayed
    if(task===''){
        showError('The field can´t be empty');
        return;
    }

    // Object is created with the task and its id
    const taskData={
        id:Date.now(),
        // task:task or:
        task
    }

    // The task is added to the array
    tasks=[...tasks, taskData];

    // The HTML is created
    createHTML();

    // The form is reset
    form.reset();
}

function showError(error){

    // If there is an error, it is created in the HTML, displayed and removed after 3 seconds
    const messageError=document.createElement('p');
    messageError.textContent=error;
    messageError.classList.add('error');

    const content=document.querySelector('.main');

    content.appendChild(messageError);

    setTimeout(() => {
        messageError.remove();
    }, 3000);
}

function createHTML(){
    // If there are tasks, the HTML is created
    if(tasks.length >= 0){

        // The HTML is cleaned because if not, the tasks would be repeated
        cleanHTML();

        // For each task, a list item is created with the task and a button to delete it
        tasks.forEach(task => {
            const btnDelete=document.createElement('a');
            btnDelete.classList.add('remove-task');
            btnDelete.textContent='X';

            btnDelete.onclick= ()=>{
                // The task is deleted when the button is clicked
                deleteTask(task.id);
            }

            const taskField=document.createElement('li');
            taskField.textContent=task.task;
            taskField.style.paddingBottom='10px';
            taskField.style.fontSize='20px';
            taskField.style.fontFamily='Arial';
            list.appendChild(taskField);
            taskField.appendChild(btnDelete);
        });
    }
    syncUpStorage();
}

function cleanHTML(){

    // articles.innerHTML='';          Slow form

    // While there is a first child, it is removed (until there is no more)
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

// Local storage is updated with the array of tasks
function syncUpStorage(){
    localStorage.setItem('Tasks',JSON.stringify(tasks));
}

// Function to delete a task from the array according to its id which is passed as a parameter in line 86
function deleteTask(id){
    // The array is filtered and the task with the id that is passed as a parameter is removed
    tasks=tasks.filter(task => task.id !== id);
    // The HTML is created again, without the deleted task
    createHTML();
}
