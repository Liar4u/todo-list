let activeElement;

// Checking for the legality of drag and drop events

function itIsLegal(targetObject) {
  const item = activeElement.classList;
  let target = targetToItem(targetObject).classList;

  if (target.contains('start')) {
    return item.contains('pause') ? true : false;
  } else if (
    target.contains('pause') ||
    (target.contains('placeholder') &&
      targetObject.target.childNodes.length == 0)
  ) {
    return item.contains('start') ? true : false;
  } else {
    return false;
  }
}

// If the target is an icon, changes the target to his parent element (.item)

function targetToItem(event) {
  if (event.target.classList.contains('material-icons')) {
    return event.target.closest('.item');
  } else {
    return event.target;
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
    let target = targetToItem(event);

    const holdCopy = document.querySelector('.hold').cloneNode(true);
    if (itIsLegal(event) && !target.classList.contains('placeholder')) {
      target.replaceWith(holdCopy);
    } else {
      target.append(holdCopy);
    }

    target.classList.remove('hovered');
    holdCopy.classList.remove('hold');
    holdCopy.setAttribute('draggable', 'false');
    holdCopy.style.cursor = 'unset';
  },
};

export default drag;
