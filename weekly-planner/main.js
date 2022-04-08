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

var previousEntriesJSON = localStorage.getItem('weekly-planner');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', beforeUnload);
function beforeUnload(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('weekly-planner', entriesJSON);
}

window.addEventListener('DOMContentLoaded', loadDefault);
function loadDefault(event) {
  var start = createTable(data.days.monday);
  $table.appendChild(start);
  $taskListHeading.textContent = 'Scheduled Event for Monday';
}

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

$table.addEventListener('click', tableClickHandler);
function tableClickHandler(event) {
  if (!event.target.matches('button')) {
    return;
  }
  $modal.classList.remove('hidden');
  $form.day.value = event.target.getAttribute('data-days');
  for (var i = 0; i < data.days[event.target.getAttribute('data-days')].length; i++) {
    if (event.target.getAttribute('data-event-id') === data.days[event.target.getAttribute('data-days')][i].eventId.toString()) {
      $form.time.value = data.days[event.target.getAttribute('data-days')][i].time;
    }
  }
}

$addEntryButton.addEventListener('click', handleEntry);
function handleEntry(event) {
  $modal.classList.remove('hidden');
}

$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  var obj = {};
  obj.dayOfTheWeek = $daySelect.value;
  obj.eventId = data.nextEventId;
  obj.time = $timeSelect.value + ' ' + $amPm.value.toUpperCase();
  obj.description = $description.value;
  $modal.classList.add('hidden');
  data.days[$daySelect.value].push(obj);
  data.nextEventId++;
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
    var $updateButton = document.createElement('button');

    $timeTD.textContent = array[i].time;
    $descrTD.textContent = array[i].description;
    $descrTD.className = 'large-td';
    $timeTD.className = 'small-td';
    $updateButton.textContent = 'Update';
    $updateButton.setAttribute('data-event-id', array[i].eventId);
    $updateButton.setAttribute('data-days', array[i].dayOfTheWeek);
    $updateButton.className = 'update-button button';
    $tr.setAttribute('data-event-id', array[i].eventId);
    $tr.appendChild($timeTD);
    $tr.appendChild($descrTD);
    $descrTD.appendChild($updateButton);
    $tbody.appendChild($tr);
  }
  return $tbody;
}
