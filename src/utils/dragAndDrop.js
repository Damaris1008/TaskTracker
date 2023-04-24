// select the item element
const item = document.querySelector('.item');

// attach the dragstart event handler
item.addEventListener('dragstart', dragStart);

// handle the dragstart

function dragStart(e) {
   console.log('drag starts...');
}