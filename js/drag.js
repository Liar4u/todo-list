let activeElement;

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

const drag = {
  start(event) {
    const taskId = String(event.target.id);
    const parent = document.getElementById(taskId);
    event.target.classList.add('hold');
    activeElement = event.target;
    parent.closest('.placeholder').classList.remove('closed');
  },

  end(event) {
    event.target.classList.remove('hold', 'hide');
  },

  over(event) {
    if (itIsLegal(event)) {
      event.preventDefault();
    }
  },

  enter(event) {
    if (
      !event.target.classList.contains('closed') &&
      event.target.classList.contains('placeholder')
    ) {
      event.target.classList.add('hovered');
    }
  },

  leave(event) {
    event.target.classList.remove('hovered');
  },

  drop(event) {
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
  },
};

// module.exports = drag;

export default drag;
