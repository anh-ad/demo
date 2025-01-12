// // Complete Project Details at: https://RandomNerdTutorials.com/

// // Database Paths
// var dataIntPath = 'Dieu khien/int';
// var database = firebase.database();
// // Get a database reference 
// const databaseInt = database.set(dataIntPath);

// // Variables to save database current values
// var floatReading;
// var intReading;
// // Attach an asynchronous callback to read the data
// function UpdateData(){
//   firebase.database().ref('demo').set({
//       demo: 1
//     })
// }
// databaseInt.on('value', (snapshot) => {
//   intReading = snapshot.val();
//   console.log(intReading);
//   document.getElementById("DK").innerHTML = intReading;
// }, (errorObject) => {
//   console.log('The read failed: ' + errorObject.name);
// });


// Database Paths
var dataFloatPath = 'test/float';
var dataIntPath = 'test/int';

// Get a database reference 
const databaseFloat = database.ref(dataFloatPath);
const databaseInt = database.ref(dataIntPath);

// Variables to save database current values
var floatReading;
var intReading;

// Attach an asynchronous callback to read the data
databaseFloat.on('value', (snapshot) => {
  floatReading = snapshot.val();
  console.log(floatReading);
  document.getElementById("reading-float").innerHTML = floatReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

databaseInt.on('value', (snapshot) => {
  intReading = snapshot.val();
  console.log(intReading);
  document.getElementById("reading-int").innerHTML = intReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});