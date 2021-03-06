'use strict';
import drag from './drag.js';

const container = document.querySelector('main');
const items = container.querySelectorAll('.item');
let taskList;
let currentTask;
init();

function init() {
  // "Add" button logic
  document.querySelector('.addBtn').addEventListener('click', addNewTask);
  initItems();
  initTasks();
}

function initItems() {
  items.forEach((element) => {
    element.addEventListener('dragstart', drag.start);
    element.addEventListener('dragend', drag.end);
  });
}

function initTasks() {
  updateTaskList();
  for (let i in taskList) {
    currentTask = taskList[i];
    initCurrentTask();
  }
}

function initCurrentTask() {
  const titleElement = currentTask.getElementsByClassName('title')[0];
  const descriptionElement =
    currentTask.getElementsByClassName('description')[0];
  const placeholder = currentTask.getElementsByClassName('placeholder')[0];
  const delButton = currentTask.getElementsByClassName('delete')[0];
  const editButton = currentTask.getElementsByClassName('edit')[0];

  // init changing focus and save function after pressing the 'Enter' key in the input.
  titleElement.addEventListener('keypress', (event) => {
    event.key === 'Enter' ? taskSaveOrFocusChange() : null;
  });
  descriptionElement.addEventListener('keypress', (event) => {
    event.key === 'Enter' ? taskSaveOrFocusChange() : null;
  });

  // init listeners to save changes in the task if input has become inactive
  titleElement.addEventListener('blur', lossOfFocus);
  descriptionElement.addEventListener('blur', lossOfFocus);

  // init placeholder in task
  placeholder.addEventListener('dragover', drag.over);
  placeholder.addEventListener('dragenter', drag.enter);
  placeholder.addEventListener('dragleave', drag.leave);
  placeholder.addEventListener('drop', drag.drop);

  // init modify buttons in task
  delButton.addEventListener('click', taskDelete);
  editButton.addEventListener('click', taskEditor);
}

function lossOfFocus(event) {
  !event.relatedTarget && event.target.disabled === false
    ? taskSaveOrFocusChange()
    : null;
}

function taskDelete(event) {
  event.target
    .closest('.tasks')
    .removeChild(event.target.closest('.task-item'));
  updateTaskList();
}

function taskEditor(event) {
  currentTask = event.target.closest('.task-item');
  const titleElement = currentTask.getElementsByClassName('title')[0];
  const descriptionElement =
    currentTask.getElementsByClassName('description')[0];

  if (titleElement.disabled === true && descriptionElement.disabled === true) {
    titleElement.disabled = false;
    descriptionElement.disabled = false;
    // titleElement.focus();

    titleElement.classList.add('active_input');
    descriptionElement.classList.add('active_input');
  } else {
    taskSaveOrFocusChange();
  }
}

function taskSaveOrFocusChange() {
  const titleElement = currentTask.getElementsByClassName('title')[0];
  const descriptionElement =
    currentTask.getElementsByClassName('description')[0];

  titleElement.disabled = true;
  descriptionElement.disabled = true;

  titleElement.classList.remove('active_input');
  descriptionElement.classList.remove('active_input');
}

function whatStatus(task) {
  // returning task status depending on the element inside the placeholder
  // used for checking legality editing task information
}

function updateTaskList() {
  taskList = [...document.getElementsByClassName('task-item')];
  currentTask = taskList[taskList.length - 1];
}

// Adding new tasks

function addNewTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const div = document.createElement('div');
  div.setAttribute('class', 'task-item');
  div.innerHTML = `
  <div class="task-info">
    <input type="text" class="title" disabled value="${title}"/>
    <input type="text" class="description" disabled value="${description}"/>
  </div>
  <div class="task-control">
    <div class="placeholder__container">
      <div class="placeholder"></div>
    </div>
    <div class="modify">
      <div class="modify-items">
        <span class="material-icons edit"> edit </span>
        <span class="material-icons delete"> delete </span>
      </div>
    </div>
  </div >`;

  document.querySelector('.tasks').append(div);
  updateTaskList();
  initCurrentTask();
}
