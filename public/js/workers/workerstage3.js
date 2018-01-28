/*
  WORKER STAGE 3
*/

onmessage = function(e) {
  var data = JSON.parse(e.data);

  console.log('Worker stage 3: message received from importmgmt.js');

  // process here
  data.forEach( function(subArr){

    subArrLen = subArr.length;

    for (var i = 0; i < subArrLen; i++) {
      subArr[3] = "dit is een test";
    }
  });

  //post back results
  postMessage(JSON.stringify(data));
};
