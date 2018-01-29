/*
  WORKER STAGE 2
*/
onconnect = function(e) {
  var port2 = e.ports[0];

  port2.onmessage = function(e) {

    importScripts("..\\main.js");
    console.log('Worker stage 2: message received from importmgmt.js');

    // process here
    var array = [];

    e.data.forEach( function(line) {

      array.push(line.split(','));
    });

    //post back results
    //port.postMessage(array);

    //send data to stage 3 worker
    workerStage3.port.postMessage(res.data);
    perfTable('Stage 2', (new Date()).getTime());
  };

  self.onerror = function (e) {
    ports.forEach(function (port) { port.postMessage(e); });
  };
}

self.onerror = function (e) {
  ports.forEach(function (port) { port.postMessage(e); });
};
