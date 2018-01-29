/*
  WORKER STAGE 3
*/
onconnect = function(e) {
  var port3 = e.ports[0];

  console.log({'Worker stage 3 connected initiated..'});

  port3.onmessage = function(e) {

    console.log('Worker stage 3: message received from importmgmt.js');

    // process here
    e.data.forEach( function(subArr){

      subArrLen = subArr.length;

      for (var i = 0; i < subArrLen; i++) {
        subArr[3] = "dit is een test";
      }
    });

    //post back results
    port3.postMessage(data);
  };
}

onerror = function(err) {
  throw(err);
}
