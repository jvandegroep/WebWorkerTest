/*
  WORKER STAGE 3
*/

onmessage = function(e) {

  console.log('Worker stage 3: message received from importmgmt.js');

  // process here
  var arrLen = e.data.length;

  for (var j = 0; j < arrLen; j++) {

    var subArr = e.data[j];
    var subArrLen = subArr.length;

    for (var i = 0; i < subArrLen; i++) {
      subArr[3] = "dit is een test";
    }
  }

  //post back results
  postMessage(e.data);
  close();
};
