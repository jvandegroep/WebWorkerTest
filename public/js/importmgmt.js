var chunkSize = 0;
var arrEntries;
var chunk = 0;
var i = 0;

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
  PROCESSING ORCHESTRATION BY WORKERS
*/
function workerProcessing(data) {

  console.log('starting workers to do the processing..');
  $('#status').html('busy').css("color", "orange");
  chunk = 0;
  i = 0;

  //starting workers
  var workerStage1 = new Worker('./js/workers/workerstage1.js');

  //send data to first worker
  workerStage1.postMessage(data);
  data = []; // clear data

  //on message of the first worker

  workerStage1.onmessage = function(res) {

    perfTable('Stage 1', (new Date()).getTime());

    //determine chunksize used in worker 1
    chunkSize = res.data.length;
    console.log('The array is split into', chunkSize + ' chunks.');
    $('#chunks').html(chunkSize);

    arrEntries = res.data.entries(); //create iterative array in global scope
    res = undefined; //clean res
    self.onmessage = undefined;

    //kick of Workers 2 and 3
    runWorkers();
  };
}


/*
  RUN WORKERS 2 & 3
*/
function runWorkers() {

  var data = arrEntries.next();

  if (data.done === false) {

    var subArr = data.value[1];

    var workerStage2 = new Worker('./js/workers/workerstage2.js');

    workerStage2.postMessage(subArr);

    //on message of the second worker
    workerStage2.onmessage = function(res) {

      perfTable('Stage 2', (new Date()).getTime());

      eval("workerStage3_" + i + " = new Worker('./js/workers/workerstage3.js')");

      //send data to worker 3
      eval("workerStage3_" + i).postMessage(res.data);

      //clear data
      this.onmessage = undefined;
      res = undefined;

      //on message of the third worker
      eval("workerStage3_" + i).onmessage = function (res) {

        //console.log('Stage 3 done @ ', new Date());
        perfTable('Stage 3', (new Date()).getTime());
        chunksDone();

        //send data to be assemblied
        assembleData(res.data);

        chunk++;
        i++;

        //clear data
        this.onmessage = undefined;
        res = undefined;

        //check if all chunks are processed
        if (chunk >= chunkSize) {

          //console.log("end result:", assembledArray);
          $('#status').html('Done').css("color", "black");
        } else {
          runWorkers(); //spawn workers till all chunks are processed.
        }
      }
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
