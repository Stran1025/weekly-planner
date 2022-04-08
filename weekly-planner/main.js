var data = {
  view: '',
  days: {
    monday: [{ time: '10:00', description: 'test' }],
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
var $taskListHeading = document.querySelector('#task-list-heading');
var $table = document.querySelector('#display-table');

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
  data.days[$daySelect.value].push(obj);
}

$dayRow.addEventListener('click', dayButton);
function dayButton(event) {
  if (!event.target.matches('p')) {
    return;
  }
  for (var key in data.days) {
    if (event.target.getAttribute('data-days') === key) {
      var $tbody = document.querySelector('tbody');
      if ($tbody !== null) {
        $tbody.remove();
      }
      $taskListHeading.textContent = 'Scheduled Event for' + ' ' + key[0].toUpperCase() + key.substring(1);
      var $tableBody = createTable(data.days[key]);
      $table.appendChild($tableBody);
    }
  }
}

function createTable(array) {
  var $tbody = document.createElement('tbody');
  for (var i = 0; i < array.length; i++) {
    var $tr = document.createElement('tr');
    var $timeTD = document.createElement('td');
    var $descrTD = document.createElement('td');

    $timeTD.textContent = array[i].time;
    $descrTD.textContent = array[i].description;
    $tr.appendChild($timeTD);
    $tr.appendChild($descrTD);
    $tbody.appendChild($tr);
  }
  return $tbody;
}
