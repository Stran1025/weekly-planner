var $addEntryButton = document.querySelector('#add-entry');
var $modal = document.querySelector('#modal');
var $submitButton = document.querySelector('#submit-button');
var $form = document.querySelector('#entry-form');

$addEntryButton.addEventListener('click', handleEntry);
function handleEntry(event) {
  $modal.classList.remove('hidden');
}

$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  $modal.classList.add('hidden');
}
