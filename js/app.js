'use strict';
import drag from './drag.js';

const container = document.querySelector('main');
let placeholders = [...document.getElementsByClassName('placeholder')];
const items = container.querySelectorAll('.item');
let activeElement;
init();

function init() {
  initItems();
  initPlaceholders(placeholders);
  activeElement = null;
}

function initItems() {
  items.forEach((element) => {
    element.addEventListener('dragstart', (event) => drag.start(event));
    element.addEventListener('dragend', (event) => drag.end(event));
  });
}

function initPlaceholders(placeholders) {
  updatePlaceholdersList();
  for (let i in placeholders) {
    initCurrentPlaceholder(placeholders[i]);
  }
}

function initCurrentPlaceholder(placeholder) {
  placeholder.addEventListener('dragover', (event) => drag.over(event));
  placeholder.addEventListener('dragenter', (event) => drag.enter(event));
  placeholder.addEventListener('dragleave', (event) => drag.leave(event));
  placeholder.addEventListener('drop', (event) => drag.drop(event));
}

function updatePlaceholdersList() {
  placeholders = [...document.getElementsByClassName('placeholder')];
}

// Add button logic

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
      <h1>${title}</h1>
      <p>${description}</p>
    </div>
    <div class="placeholder"></div>
    <div class="modify">
      <div class="delete"></div>
      <div class="edit"></div>`;

  document.querySelector('.task').append(div);
  updatePlaceholdersList();
  initCurrentPlaceholder(placeholders[placeholders.length - 1]);
}
