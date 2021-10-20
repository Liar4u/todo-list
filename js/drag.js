let activeElement;

// Checking for the legality of drag and drop events

function itIsLegal(targetObject) {
  const item = activeElement.classList;
  const target = targetObject.target.classList;
  if (target.contains('start')) {
    return item.contains('pause') ? true : false;
  } else if (target.contains('pause') || target.contains('placeholder')) {
    return item.contains('start') ? true : false;
  } else {
    return false;
  }
}

// Drag and drop functions

const drag = {
  start(event) {
    event.target.classList.add('hold');
    activeElement = event.target;
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
    if (event.target.classList.contains('placeholder')) {
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
    holdCopy.classList.remove('hold');
    holdCopy.setAttribute('draggable', 'false');
    holdCopy.style.cursor = 'unset';
  },
};

export default drag;
