/*
  WORKER STAGE 1
*/
onmessage = function( e ) {

  console.log('Worker stage 1: message received from importmgmt.js');

  // split by new line
  var array = e.data.split('\n');

  var arrGroup = [];
  var arrLen = array.length;
  var chunk = 80000; //how many lines per chunk

  if (arrLen > chunk) {

    // split array into n chuncks
    for (var i = 0; i < arrLen; i += chunk) {
      arrGroup.push(array.slice(i, i + chunk));
    }
  } else {

    arrGroup = array;
  }

  //post back results
  postMessage(arrGroup);
  close();
};
