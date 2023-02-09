const addBtn = document.querySelector(".add-Btn");
const taskInput = document.getElementById("task-input");
const todoContainer = document.querySelector("#incomplete-tasks");
const todoCompletedContainer = document.querySelector("#completed-tasks");

todoList = [];
todoListCompleted = [];

const addTodoHandler = () => {
    
    if (taskInput.value === ""){
        alert("Please enter a todo");
    }else{
    taskObj = {id: todoList.length, title: taskInput.value}
    todoList.push(taskObj);
    
    const taskElement = todoList.map(n => { 
        return `<li id=${n.id}>
        <input type="checkbox" class="check-box">
        <label class="title-todo">${n.title}</label>
        <input type="text" id="edit-input">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </li>`;
    })
    todoContainer.innerHTML = taskElement;
    taskInput.value = "";
}
}

const findItemSelected = (e) => {

    optionSelected = e.target.className;
    itemId = e.target.parentNode.id;
    
    if(optionSelected === "delete"){
        deleteItem(itemId,e.target.parentNode);

    }else if(optionSelected === "edit"){
        editItem(itemId,e.target.parentNode);

    }else if(optionSelected === "check-box"){
        completeTodoItem(itemId,e.target.parentNode);

    }else if(optionSelected === "checked-box"){
        deCompleteTodoItem(itemId,e.target.parentNode);
    }
}

const findElementObj = (itemId, list) => {
    list.forEach(element => {
        if (element.id === parseInt(itemId)){
            elementFinded = element;
        };
    });
    return elementFinded;
}

const deleteItem = (itemId,parentNode) => {

    if (parentNode.className === "taskComplete"){
        const elementSelected = findElementObj(itemId, todoListCompleted);
        todoListCompleted.splice(todoListCompleted.indexOf(elementSelected),1);
        todoCompletedContainer.removeChild(parentNode);

    }else{
        const elementSelected = findElementObj(itemId, todoList);
        todoList.splice(todoList.indexOf(elementSelected),1);
        todoContainer.removeChild(parentNode);
    }
}

const editItem = (itemId,parentNode) => {
    selectedTitle = parentNode.querySelector("label").innerHTML;
    
    if(parentNode.className === "editMode"){
        beforEdit = parentNode.querySelector("#edit-input").value;
        if (beforEdit === ""){
            alert("Please enter a todo");
        }else{
        parentNode.querySelector(".title-todo").innerHTML = beforEdit;
        parentNode.classList.toggle("editMode");
        const elementSelected = findElementObj(itemId, todoList);
        elementSelected.title = beforEdit;
    }
    }else{
        parentNode.className = ("editMode");
        parentNode.querySelector("#edit-input").value = selectedTitle
    }
}

const completeTodoItem = (itemId, parentNode) => {

    const itemSelected = findElementObj(itemId, todoList);
    todoList.splice(todoList.indexOf(itemSelected),1);
    todoListCompleted.push(itemSelected);
    todoContainer.removeChild(parentNode);

    const taskCompletedElement = todoListCompleted.map(n => { 
        return `<li id=${n.id} class="taskComplete">
        <input type="checkbox" class="checked-box" checked>
        <label class="title-todo">${n.title}</label>
        <input type="text" id="edit-input">
        <button class="delete">Delete</button>
        </li>`;
    })
    todoCompletedContainer.innerHTML = taskCompletedElement;
}

const deCompleteTodoItem = (itemId, parentNode) => {

    const itemSelected = findElementObj(itemId,todoListCompleted);
    console.log(itemSelected);
    todoListCompleted.splice(todoListCompleted.indexOf(itemSelected),1);
    todoList.push(itemSelected);
    todoCompletedContainer.removeChild(parentNode);

    const taskElement = todoList.map(n => { 
        return `<li id=${n.id}>
        <input type="checkbox" class="check-box">
        <label class="title-todo">${n.title}</label>
        <input type="text" id="edit-input">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        </li>`;
    })
    todoContainer.innerHTML = taskElement;
}

todoCompletedContainer.addEventListener('click',findItemSelected);
todoContainer.addEventListener("click", findItemSelected);
addBtn.addEventListener("click", addTodoHandler)




// *************************** first solution ***************************

// let todoList = [];
// let todoListDone = [];


// let id;
// let title;
// taskObj = {
//     id: id,
//     title: title
// };

// function addTodoTasks(){

//     taskObj = {id: todoList.length, title:userInput.value};
//     todoList.push(taskObj);


//     if(userInput.value === ""){
//         alert("Please enter a task");
//     }else{
//         const liItem = document.createElement('li');
//         checkBox = document.createElement('input');
//         checkBox.type = 'checkbox';
//         liItem.appendChild(checkBox);
//         deleteBtn = document.createElement('button');
//         deleteBtn.className = 'delete';
//         deleteBtn.innerText = 'Delete';
//         title = document.createElement('label');
//         title.innerText = userInput.value;
//         liItem.id = todoList.length;
//         liItem.appendChild(title);
//         liItem.appendChild(deleteBtn);
//         todoContainer.appendChild(liItem);
//         userInput.value = "";
//     }
    
//     deleteBtn.addEventListener('click', (e)=>{
//         const itemId = e.target.parentNode.id;
//         itemForDelete = document.getElementById(itemId);
//         todoContainer.removeChild(itemForDelete);
//         todoList.pop(id === itemId);
//     });
    
//     checkBox.addEventListener('click', (e)=>{
//         const itemId = e.target.parentNode.id;
//         itemSelected = document.getElementById(itemId);
//         console.log(itemSelected);
//         const x = todoList.pop(itemSelected.id);
//         todoContainer.removeChild(itemSelected);
//         todoListDone.push(x);
//         completedTodo.appendChild(itemSelected);
//         itemSelected.className = "completed-tasks";
//     });
// }

// function findItemId(e){
//     return (e.target.parentNode.id);
// }

// addBtn.addEventListener('click', addTodoTasks);