import './style.scss'

let addButton = document.getElementById('add');
let addBlockButton = document.getElementById('addBlock');
// let inputTask = document.getElementById('new-task');
// let tasks = document.getElementById('tasks');
let container = document.getElementById('container');

let currentCount = 1;

function makeCounter() {
  return function() {
    return currentCount++;
  };
}

let counter = makeCounter();

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
    listItem.appendChild(input);
    listItem.appendChild(buttonDel);
    listItem.appendChild(editDel);

    return listItem;
}
function addTask() {
    console.log(this.previousSibling )
    let tasks = this.parentNode.parentNode.lastChild
    let value = this.parentNode.firstChild.value 
    if (value) {
        let listItem = createTask(value);
        tasks.appendChild(listItem);
        this.parentNode.firstChild.value = '';
        bindTaskEvents(listItem)
        // console.log(this.parentNode.firstChild)
    }
}

let createBlockTask = () => {
    let listItem = document.createElement('div');
    listItem.className = 'row'
    listItem.id = counter()
    let divAddBlock = document.createElement('div');
    divAddBlock.className = 'addBlock'
    let input = document.createElement('input');
    input.type = "text";
    input.id = `new-task`;
    let buttonAdd = document.createElement('button');
    buttonAdd.id = "add"
    buttonAdd.innerText = "Add"
    buttonAdd.onclick = addTask;
    let Ul = document.createElement('ul')
    Ul.id = "tasks"

    divAddBlock.appendChild(input);
    divAddBlock.appendChild(buttonAdd);

    listItem.appendChild(divAddBlock);
    listItem.appendChild(Ul);
    
    return listItem;
}


let addBlockTask = () => {
    let listItem = createBlockTask();
    container.appendChild(listItem);
    // bindTaskEvents(listItem)
}

// addButton.onclick = addTask;
addBlockButton.onclick = addBlockTask;

function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem)

}
function editTask() {
    let listItem = this.parentNode;
    let label = listItem.querySelector('label');
    let input = listItem.querySelector('input[type=text]');

    let containsClass = listItem.classList.contains('editMode')

    if (containsClass) {
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
