var data = {
  view: '',
  events: [],
  editing: null,
  nextEventId: 1
};

var $addEntryButton = document.querySelector('#add-entry');
var $modal = document.querySelector('#modal');
var $form = document.querySelector('#entry-form');
var $daySelect = document.querySelector('#day');
var $amPm = document.querySelector('#am-pm');
var $timeSelect = document.querySelector('#time');
var $description = document.querySelector('#description');

$addEntryButton.addEventListener('click', handleEntry);
function handleEntry(event) {
  $modal.classList.remove('hidden');
}

$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  var obj = {};
  obj.day = $daySelect.value;
  obj.time = $timeSelect.value + ' ' + $amPm.value.toUpperCase();
  obj.description = $description.value;
  $modal.classList.add('hidden');
  data.events.push(obj);
}
