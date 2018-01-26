var chunkSize = 0;

/*
  IMPORT CSV DATA
*/
function importCSVData(evt) {

  var file = evt.target.files[0];
  if (file) {

    console.log('File import active!');
    var reader = new FileReader();

    //handle file on load
    reader.onload = (function() {

      //send data to workers, and empty previous result
      assembledArray = [];
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
  var workerStage1 = new Worker('./js/workers/workerstage1.js');
  var workerStage2 = new Worker('./js/workers/workerstage2.js');
  var workerStage3 = new Worker('./js/workers/workerstage3.js');

  //send data to first worker
  workerStage1.postMessage(data);

  //on message of the first worker
  workerStage1.onmessage = function(res) {

    //console.log('Stage 1 done @ ', new Date());
    perfTable('Stage 1', (new Date()).getTime());

    //determine chunksize used in worker 1
    chunkSize = res.data.length;
    console.log('The array is split in ', chunkSize + 'chunks.');
    $('#chunks').html(chunkSize);

    //send data chunks to stage 2 worker
    res.data.forEach(function(subArr) {

      workerStage2.postMessage(subArr);
    });
  }

  //on message of the second worker
  workerStage2.onmessage = function(res) {

    //console.log('Stage 2 done @ ', new Date());
    perfTable('Stage 2', (new Date()).getTime());

    //send data to stage 3 worker
    workerStage3.postMessage(res.data);
  }

  //on message of the third worker
  chunk = 0;
  workerStage3.onmessage = function(res) {

    //console.log('Stage 3 done @ ', new Date());
    perfTable('Stage 3', (new Date()).getTime());

    //send data to be assemblied
    assembleData(res.data);

    chunk++;

    //check if all chunks are processed
    if (chunk >= chunkSize) {

      console.log("end result:", assembledArray);
      $('#status').html('Done').css("color", "black");

      //terminate workers
      workerStage2.terminate();
      workerStage3.terminate();
    }
  }
}


/*
  ASSEMBLE DATA
*/
var assembledArray = [];

function assembleData(chunkArr) {

  assembledArray = assembledArray.concat(chunkArr);
}