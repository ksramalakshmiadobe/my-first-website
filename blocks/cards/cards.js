import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';

// fetch placeholders from the 'en' folder
const placeholders = await fetchPlaceholders('en');
// retrieve the value for key 'foo'
const { click } = placeholders;

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}

const highlights = document.getElementsByClassName('highlight');

Array.from(highlights).forEach((highlight) => {
  const buttons = highlight.getElementsByClassName('button');
  Array.from(buttons).forEach((button) => {
    button.innerHTML = click;
  });
});
