function addLoader() {
  const loaderTemplate = `<div class="loader-wrapper">
    <div class="loader"></div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', loaderTemplate);

  document.body.classList.add('stop-scrolling');
}

function removeLoader() {
  document.body.querySelector('.loader-wrapper').remove();
  document.body.classList.remove('stop-scrolling');
  document.body.style.display = 'block';
}

addLoader();

window.addEventListener('load', removeLoader);
