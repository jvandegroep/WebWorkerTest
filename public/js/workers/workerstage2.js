/*
  WORKER STAGE 2
*/
onmessage = function(e) {

  console.log('Worker stage 2: message received from importmgmt.js');

  // process here
  var array = [];

  e.data.forEach( function(line) {

    array.push(line.split(','));
  });

  //post back results
  postMessage(array);

}
