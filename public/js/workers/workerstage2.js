/*
  WORKER STAGE 2
*/
onmessage = function(e) {

  var data = JSON.parse(e.data);
  console.log('Worker stage 2: message received from importmgmt.js');

  // process here
  var array = [];

  data.forEach( function(line) {

    array.push(line.split(','));
  });

  //post back results
  postMessage(JSON.stringify(array));
};
