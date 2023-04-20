//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const addInput = document.querySelector(".add-section__input");
const addButton = document.querySelector('.add-button');
const incompleteList = document.querySelector(".incomplete-todo-list");
const completedList = document.querySelector(".completed-todo-list");
//New task list item
const createNewTaskElement = (taskString) => {

    let todoItem = document.createElement("li");

    let checkBox = document.createElement("input");

    let label = document.createElement("label");

    let editInput = document.createElement("input");

    let editButton = document.createElement("button");

    let deleteButton = document.createElement("button");
    let deleteButtonImg = document.createElement("img");

    todoItem.classList = "todo-item"

    label.innerText = taskString;
    label.className = 'todo-item__task-text';

    checkBox.type = "checkbox";
    checkBox.classList = "todo-item__check-edit-mode"
    editInput.type = "text";
    editInput.className = "todo-item__edit-input";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit-button";

    deleteButton.className = "delete-button";
    deleteButtonImg.src = './remove.svg';
    deleteButton.append(deleteButtonImg);

    todoItem.append(checkBox);
    todoItem.append(label);
    todoItem.append(editInput);
    todoItem.append(editButton);
    todoItem.append(deleteButton);

    return todoItem;
}
const addTask = () => {
    if (!addInput.value) return;

    let todoItem = createNewTaskElement(addInput.value);
    incompleteList.append(todoItem);
    bindTaskEvents(todoItem, taskCompleted);

    addInput.value = "";
}
//Edit an existing task.
const editTask = (e) => {
    let todoItem = e.target.parentNode;
    let editInput = todoItem.querySelector(".todo-item__edit-input");
    let taskText = todoItem.querySelector(".todo-item__task-text");
    let editBtn = todoItem.querySelector(".edit-button");

    if (todoItem.classList.contains("edit-mode")) {
        taskText.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = taskText.innerText;
        editBtn.innerText = "Save";
    }
    todoItem.classList.toggle("edit-mode");
};
//Delete task.
const deleteTask = (e) => {
    e.target.closest('li').remove()
}
//Mark task completed
const taskCompleted = (e) => {
    let todoItem = e.target.parentNode;
    completedList.append(todoItem);
    bindTaskEvents(todoItem, taskIncomplete);
}
//Mark task as incomplete.
const taskIncomplete = (e) => {
    //When the checkbox is unchecked
    //Append the todoItem to the incompleteList.
    let todoItem = e.target.parentNode;
    incompleteList.append(todoItem);
    bindTaskEvents(todoItem, taskCompleted);
}
//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

const bindTaskEvents = (todoItem, checkBoxEventHandler) => {
    let checkBox = todoItem.querySelector(".todo-item__check-edit-mode");
    let editButton = todoItem.querySelector(".edit-button");
    let deleteButton = todoItem.querySelector(".delete-button");

    editButton.addEventListener('click', editTask)
    deleteButton.addEventListener('click', deleteTask)
    checkBox.addEventListener('change', checkBoxEventHandler)
}
//cycle over incompleteList items
console.log(incompleteList)
for (let i = 0; i < incompleteList.children.length; i++) {
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteList.children[i], taskCompleted);
}
//cycle over completedList items
for (let i = 0; i < completedList.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedList.children[i], taskIncomplete);
}