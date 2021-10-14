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
  let placeholder = task.getElementsByClassName('placeholder')[0];
  let delButton = task.getElementsByClassName('delete')[0];
  let editButton = task.getElementsByClassName('edit')[0];

  // init placeholder in task
  placeholder.addEventListener('dragover', (event) => drag.over(event));
  placeholder.addEventListener('dragenter', (event) => drag.enter(event));
  placeholder.addEventListener('dragleave', (event) => drag.leave(event));
  placeholder.addEventListener('drop', (event) => drag.drop(event));

  // init modify buttons in task
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
