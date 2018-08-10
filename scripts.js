var clients = [];
var ages;
var names;

var promise1 = getData('https://api.myjson.com/bins/xqrsi').then(JSON.parse).then(function(response){
  ages = response;
  console.log("Success!", ages);
});
var promise2 = getData('https://api.myjson.com/bins/szaya').then(JSON.parse).then(function(response){
  names = response;
  console.log("Success!", names);
});

Promise.all([promise1, promise2]).then(function(values) {

  for (var i = 0; i < names.length; i++) {
    for (var j = 0; j < ages.length; j++) {
      if(names[i].id === ages[j].id) {
        clients.push([names[i].id, names[i].firstName, names[i].lastName, ages[i].age]);
      }
    }
  }
  print();

}); 

function print() {
  var header = '| ID | First Name | Last Name | Age |</br>| --- | -------------- | ------------- | ----- |</br>';
  document.getElementById("p1").innerHTML = header;

 // document.getElementById('root').innerHTML += header;
  clients.forEach(client => {
    document.write('| ',client[0],' | ',client[1],' | ',client[2],' | ',client[3],' | </br>');

  });
} 


function getData(url) {

  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
      var data = JSON.parse(this.response);
      if (request.status == 200) {
        resolve(request.response);
      }
      else {
        reject(Error(req.statusText));
      }
    };

    request.onerror  = function() {
      reject(Error("Network Error"));
    };

    request.send();
  });
}