/*
  PERFORMANCE TABLE
*/
function perfTable(string, epoch) {

  var date = new Date(epoch);

  var newRow = "<tr><td>" + string + "</td><td>" + date.toLocaleString() +
  "</td><td>" + epoch + "</td></tr>";

  $('.table > tbody:last-child').append(newRow);

  //get the first and last child of the table
  var dateStart = $('.table tr').eq(1)[0].cells[2].innerText;
  var dateEnd = $('.table tr:last')[0].cells[2].innerText;

  var totalTime = parseFloat((parseInt(dateEnd) - parseInt(dateStart)) / 1000).toFixed(2)

  $('#totalSeconds').html(totalTime);
}


/*
  RUN AT DOM LOAD
*/
$(document).ready(function () {


  //add event handler for file upload
  var el = document.getElementById('file');
  if (el) {
    el.addEventListener('change', importCSVData, false);
  }

});
