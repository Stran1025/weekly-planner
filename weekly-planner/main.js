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
var $taskListHeading = document.querySelector('#task-list-heading');

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
  if (!event.target.matches('p')) {
    return;
  }
  for (var key in data.days) {
    if (event.target.getAttribute('data-days') === key) {
      $taskListHeading.textContent = 'Scheduled Event for' + ' ' + key[0].toUpperCase() + key.substring(1);
      createTable(data.days[key]);
    }
  }
}

function createTable(array) {
  // <table>
  //   <tbody>
  //     <tr> repeat for all index
  //       <td>obj[i].time</td>
  //       <td>obj[i.description</td>
  //     </tr>
  //   </tbody>
  // </table>
  var $tbody = document.createElement('tbody');
  for (var i = 0; i < array.length; i++) {
    var $tr = document.createElement('tr');
    var $timeTD = document.createElement('td');
    var $descrTD = document.createElement('td');

    $timeTD.textContent = array[i].time;
  }
}
