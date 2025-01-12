// Import the functions you need from the SDKs you need

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// import "firebase/database";
// Database Paths
var dataIntPath = '/DK';

// Get a database reference 
const databaseInt = database.ref(dataIntPath);
var database = firebase.database();
// Variables to save database current values
var intReading;
// Attach an asynchronous callback to read the data


// Hàm gửi dữ liệu vào Firebase
const sendDataToFirebase = () => {
  const data = {
    control: 10
  };
  // Gửi dữ liệu vào đường dẫn "/test/data"
  firebase.database().ref('/DK').set(data)
    .then(() => {
      document.getElementById('status').innerHTML = '<img src="icondensang.png" alt="Hình ảnh" width="80">';
    })
    .catch((error) => {
      document.getElementById('status').innerText = `Lỗi: ${error.message}`;
    });
};
document.getElementById('sendButton').addEventListener('click', sendDataToFirebase);

const sendDataToFirebase1 = () => {
  const data = {
    control: 20
  };
  firebase.database().ref('/DK').set(data)
    .then(() => {
      document.getElementById('status').innerHTML ='<img src="tatled.png" alt="Hình ảnh" width="80">';
    })
    .catch((error) => {
      document.getElementById('status').innerText = `Lỗi: ${error.message}`;
    });
};
// Gắn sự kiện click vào nút
document.getElementById('sendButton1').addEventListener('click', sendDataToFirebase1);


// databaseInt.on('value', (snapshot) => {
//   intReading = snapshot.val();
//   console.log(intReading);
//   document.getElementById("reading-int").innerHTML = intReading;
// }, (errorObject) => {
//   console.log('The read failed: ' + errorObject.name);
// });