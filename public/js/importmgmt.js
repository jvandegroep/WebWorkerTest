var chunkSize = 0;
var arrEntries;

/*
  IMPORT CSV DATA
*/
function importCSVData(evt) {

  var file = evt.target.files[0];
  if (file) {

    console.log('File import active!');
    $('.table > tbody').html(""); //empty table
    $('#progress').html('0'); // set progress to null

    var reader = new FileReader();

    //handle file on load
    reader.onload = (function() {

      //send data to workers
      assembledArray = []; //and empty previous results
      workerProcessing(reader.result);
    });

    reader.readAsText(file);
  } else {
    console.log('No file is selected.');
  }
}



/*
  PROCESSING BY WORKERS
*/
function workerProcessing(data) {

  console.log('starting workers to do the processing..');
  $('#status').html('busy').css("color", "orange");

  //starting workers
  var workerStage1 = new SharedWorker('./js/workers/workerstage1.js');
  var workerStage2 = new SharedWorker('./js/workers/workerstage2.js');
  var workerStage3 = new SharedWorker('./js/workers/workerstage3.js');

  //send data to first worker
  workerStage1.port.postMessage(data);

  //on message of the first worker
  workerStage1.port.onmessage = function(res) {

    perfTable('Stage 1', (new Date()).getTime());

    //determine chunksize used in worker 1
    chunkSize = res.data.length;
    console.log('The array is split into', chunkSize + ' chunks.');
    $('#chunks').html(chunkSize);

    arrEntries = res.data.entries();

    workerStage2.port.postMessage(arrEntries.next().value[1]);
  };


  //on message of the third worker
  chunk = 0;
  workerStage3.port.onmessage = function(res) {


    console.log('Stage 3 done @ ', new Date());
    perfTable('Stage 3', (new Date()).getTime());
    chunksDone();

    //send data to be assemblied
    assembleData(res.data);

    chunk++;

    //check if all chunks are processed
    if (chunk >= chunkSize) {

      console.log("end result:", assembledArray);
      $('#status').html('Done').css("color", "black");

      //terminate worker
      workerStage2.terminate();
      workerStage3.terminate();

    } else {

      // get next array entry
      var arrEntry = arrEntries.next();

      if (arrEntry.done === false) {

        workerStage2.port.postMessage(arrEntry.value[1]);
      }
    }
  };
}


/*
  ASSEMBLE DATA
*/
var assembledArray = [];

function assembleData(chunkArr) {

  assembledArray = assembledArray.concat(chunkArr);
}
