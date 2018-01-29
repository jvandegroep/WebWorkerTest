/*
  WORKER STAGE 2
*/
onmessage = function(e) {

  console.log('Worker stage 2: message received from importmgmt.js');

  // process here
  var newArray = [];
  var arrLen = e.data.length;

  for (var i = 0; i < arrLen; i++) {
    newArray.push(e.data[i].split(','));
  }

  //post back results
  postMessage(newArray);
  close();
};
