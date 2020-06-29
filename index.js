import './style.scss'

let addButton = document.getElementById('add');
let inputTask = document.getElementById('new-task');
let tasks = document.getElementById('tasks');

let createTask = (task) => {
    let listItem = document.createElement('li');
    let buttonDel = document.createElement('button');
    buttonDel.innerText = 'delete'
    buttonDel.className = 'delete'
    let editDel = document.createElement('button');
    editDel.innerText = 'edit'
    editDel.className = 'edit'
    let label = document.createElement('label');
    label.innerText = task;
    let input = document.createElement('input');
    input.type = "text";

    listItem.appendChild(label);
    listItem.appendChild(buttonDel);
    listItem.appendChild(editDel);
    listItem.appendChild(input);

    return listItem;
}

let addTask = () => {
    if (inputTask.value) {
        let listItem = createTask(inputTask.value);
        tasks.appendChild(listItem);
        inputTask.value = '';
        bindTaskEvents(listItem)
    }
}

addButton.onclick = addTask;

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem)

}
function editTask() {
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');
    // let input = listItem.querySelector('input[type=text]');

    let containsClass = listItem.classList.contains('editMode')
    console.log(listItem)
    console.log(label)
    if(containsClass){
        label.innerText = input.value;
    } else {
        input.value = label.innerText;
    }
    listItem.classList.toggle('editMode')
}
let bindTaskEvents = (listItem) => {
    let editButton = listItem.querySelector('button.edit')
    let delButton = listItem.querySelector('button.delete')

    editButton.onclick = editTask;
    delButton.onclick = deleteTask;
}