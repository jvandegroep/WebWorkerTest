/*
  WORKER STAGE 1
*/
onmessage = function( e ) {
  var data = JSON.parse(e.data);
  console.log('Worker stage 1: message received from importmgmt.js');

  // split by new line
  var array = data.split('\n');

  var arrGroup = [];
  var arrLen = array.length;
  var chunk = 100000; //how many lines per chunk

  if (arrLen > chunk) {

    // split array into n chuncks
    for (var i = 0; i < arrLen; i += chunk) {
      arrGroup.push(array.slice(i, i + chunk));
    }
  } else {

    arrGroup = array;
  }

  //post back results
  postMessage(JSON.stringify(arrGroup));
  close();
};
