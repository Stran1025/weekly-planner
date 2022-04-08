var data = {
  view: '',
  days: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  },
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
var $dayRow = document.querySelector('#day-row');

$addEntryButton.addEventListener('click', handleEntry);
function handleEntry(event) {
  $modal.classList.remove('hidden');
}

$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  var obj = {};
  obj.time = $timeSelect.value + ' ' + $amPm.value.toUpperCase();
  obj.description = $description.value;
  $modal.classList.add('hidden');
  console.log($daySelect.value);
  data.days[$daySelect.value].push(obj);
}

$dayRow.addEventListener('click', dayButton);
function dayButton(event) {
  if (event.target.textContent === 'Monday') {
  }
}
