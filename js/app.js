class drag {
  constructor(container) {
    this.container = document.querySelector(container);
    this.placeholders = [
      ...this.container.getElementsByClassName('placeholder'),
    ];
    this.items = this.container.querySelectorAll('.item');
    this.init();
  }

  init() {
    this.initItems();
    this.initPlaceholders(this.placeholders);
    this.activeElement = null;
  }

  initItems() {
    this.items.forEach((element) => {
      element.addEventListener('dragstart', (event) => this.start(event));
      element.addEventListener('dragend', (event) => this.end(event));
    });
  }

  initPlaceholders(placeholders) {
    for (let i in placeholders) {
      placeholders[i].addEventListener('dragover', (event) => this.over(event));
      placeholders[i].addEventListener('dragenter', (event) =>
        this.enter(event)
      );
      placeholders[i].addEventListener('dragleave', (event) =>
        this.leave(event)
      );
      placeholders[i].addEventListener('drop', (event) => this.drop(event));
    }
  }

  itIsLegal(targetObject) {
    const item = this.activeElement.classList;
    const target = targetObject.target.classList;
    if (target.contains('start')) {
      return item.contains('finish') || item.contains('pause') ? true : false;
    } else if (target.contains('pause') || target.contains('placeholder')) {
      return item.contains('start') || item.contains('finish') ? true : false;
    } else {
      return false;
    }
  }

  start(event) {
    const taskId = String(event.target.id);
    const parent = document.getElementById(taskId);
    event.target.classList.add('hold');
    this.activeElement = event.target;
    parent.closest('.placeholder').classList.remove('closed');
  }

  end(event) {
    event.target.classList.remove('hold', 'hide');
  }

  over(event) {
    if (this.itIsLegal(event)) {
      event.preventDefault();
    }
  }

  enter(event) {
    if (
      !event.target.classList.contains('closed') &&
      event.target.classList.contains('placeholder')
    ) {
      event.target.classList.add('hovered');
    }
  }

  leave(event) {
    event.target.classList.remove('hovered');
  }

  drop(event) {
    const holdCopy = document.querySelector('.hold').cloneNode(true);

    if (
      this.itIsLegal(event) &&
      !event.target.classList.contains('placeholder')
    ) {
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
}

// BTN Logic

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
  let placeholders = [...document.getElementsByClassName('placeholder')];
  let targetPlaceholder = placeholders[placeholders.length - 1];
  drag.placeholders = targetPlaceholder;
  drag.initPlaceholders;
  // document.querySelector('.task').lastChild;
  // drag.placeholders = placeholders
  // drag.initPlaceholders;
}
// document.getElementById('posts').appendChild(div);

new drag('main');
