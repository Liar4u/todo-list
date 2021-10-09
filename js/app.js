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
    element.addEventListener('dragstart', (event) => start(event));
    element.addEventListener('dragend', (event) => end(event));
  });
}

function initPlaceholders(placeholders) {
  updatePlaceholdersList();
  for (let i in placeholders) {
    initCurrentPlaceholder(placeholders[i]);
  }
}

function initCurrentPlaceholder(placeholder) {
  placeholder.addEventListener('dragover', (event) => over(event));
  placeholder.addEventListener('dragenter', (event) => enter(event));
  placeholder.addEventListener('dragleave', (event) => leave(event));
  placeholder.addEventListener('drop', (event) => drop(event));
}

function updatePlaceholdersList() {
  placeholders = [...document.getElementsByClassName('placeholder')];
}

// Checking for the legality of drag and drop events

function itIsLegal(targetObject) {
  const item = activeElement.classList;
  const target = targetObject.target.classList;
  if (target.contains('start')) {
    return item.contains('finish') || item.contains('pause') ? true : false;
  } else if (target.contains('pause') || target.contains('placeholder')) {
    return item.contains('start') || item.contains('finish') ? true : false;
  } else {
    return false;
  }
}

// Drag and drop functions

function start(event) {
  const taskId = String(event.target.id);
  const parent = document.getElementById(taskId);
  event.target.classList.add('hold');
  activeElement = event.target;
  parent.closest('.placeholder').classList.remove('closed');
}

function end(event) {
  event.target.classList.remove('hold', 'hide');
}

function over(event) {
  if (itIsLegal(event)) {
    event.preventDefault();
  }
}

function enter(event) {
  if (
    !event.target.classList.contains('closed') &&
    event.target.classList.contains('placeholder')
  ) {
    event.target.classList.add('hovered');
  }
}

function leave(event) {
  event.target.classList.remove('hovered');
}

function drop(event) {
  const holdCopy = document.querySelector('.hold').cloneNode(true);
  if (itIsLegal(event) && !event.target.classList.contains('placeholder')) {
    event.target.replaceWith(holdCopy);
  } else {
    event.target.append(holdCopy);
  }
  event.target.classList.remove('hovered');
  event.target.classList.add('closed');
  holdCopy.classList.remove('col-header', 'hold');
  holdCopy.setAttribute('draggable', 'false');
  holdCopy.style.cursor = 'unset';
}

// Add button logic

const btn = document.getElementById('addBtn');
btn.addEventListener('click', (event) => addNewTask());

// Adding new tasks

function addNewTask() {
  let title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  let div = document.createElement('div');
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
