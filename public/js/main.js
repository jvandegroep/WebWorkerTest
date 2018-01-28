/*
  PERFORMANCE TABLE
*/
function perfTable(string, epoch) {

  var date = new Date(epoch);

  var newRow = "<tr><td>" + string + "</td><td>" + date.toLocaleString() +
  "</td><td>" + epoch + "</td></tr>";

  $('.table > tbody:last-child').append(newRow);

  //get the first and last child of the table
  var dateStart = $('.table > tbody > tr')[0].cells[2].innerText;
  var dateEnd = $('.table > tbody > tr:last')[0].cells[2].innerText;

  var totalTime = parseFloat((parseInt(dateEnd) - parseInt(dateStart)) / 1000).toFixed(2);

  $('#totalSeconds').html(totalTime);
}



/*
  CHUNK PROGRESS
*/
function chunksDone() {
  var rows = $('.table > tbody > tr');
  var done = 0;

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].cells[0].innerText === "Stage 3") {
      done++;
    }
  }
  $('#progress').html(done);
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
