'use strict';
import drag from './drag.js';

const container = document.querySelector('main');
const items = container.querySelectorAll('.item');
let tasks;
// let task;
let activeElement;
init();

function init() {
  initItems();
  initTasks();
  activeElement = null;
}

function initItems() {
  items.forEach((element) => {
    element.addEventListener('dragstart', (event) => drag.start(event));
    element.addEventListener('dragend', (event) => drag.end(event));
  });
}

function initTasks() {
  updateTaskList();
  for (let i in tasks) {
    let task = tasks[i].getElementsByClassName('placeholder');
    initCurrentTask(tasks[i]);
  }
}

function initCurrentTask(task) {
  const titleElement = task.getElementsByClassName('title')[0];
  const descriptionElement = task.getElementsByClassName('description')[0];
  const placeholder = task.getElementsByClassName('placeholder')[0];
  const delButton = task.getElementsByClassName('delete')[0];
  const editButton = task.getElementsByClassName('edit')[0];

  //init changing focus and save function after pressing the 'Enter' key in the input.
  titleElement.addEventListener('keypress', (event) => {
    event.key === 'Enter'
      ? taskSaveOrFocusChange(titleElement, descriptionElement)
      : null;
  });

  // init placeholder in task
  placeholder.addEventListener('dragover', (event) => drag.over(event));
  placeholder.addEventListener('dragenter', (event) => drag.enter(event));
  placeholder.addEventListener('dragleave', (event) => drag.leave(event));
  placeholder.addEventListener('drop', (event) => drag.drop(event));

  // init modify buttons in task
  delButton.addEventListener('click', (event) => {
    event.target
      .closest('.tasks')
      .removeChild(event.target.closest('.task-item'));
    updateTaskList();
  });
  editButton.addEventListener('click', (event) => taskEditor(event, task));
}

function taskEditor(event, task) {
  const titleElement = task.getElementsByClassName('title')[0];
  const descriptionElement = task.getElementsByClassName('description')[0];
  if (titleElement.disabled === true && descriptionElement.disabled === true) {
    titleElement.disabled = false;
    descriptionElement.disabled = false;

    titleElement.classList.add('active_input');
    descriptionElement.classList.add('active_input');
  } else {
    taskSaveOrFocusChange(titleElement, descriptionElement);
  }
}

function taskSaveOrFocusChange(titleElement, descriptionElement) {
  titleElement.disabled = true;
  descriptionElement.disabled = true;

  titleElement.classList.remove('active_input');
  descriptionElement.classList.remove('active_input');
  // realize focus to Title input, after press ENTER, focus to desc input, then saving after pressing ENTER.
}

function whatStatus(task) {
  // returning task status depending on the element inside the placeholder
  // used for checking legality editing task information
}

function updateTaskList() {
  tasks = [...document.getElementsByClassName('task-item')];
}

// "Add" button logic

const btn = document.getElementById('addBtn');
btn.addEventListener('click', (event) => addNewTask());

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
        <div class="delete"></div>
        <div class="edit"></div>
      </div>
    </div>
  </div >`;

  document.querySelector('.tasks').append(div);
  updateTaskList();
  initCurrentTask(div);
}
