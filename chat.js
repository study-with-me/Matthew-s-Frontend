var socket = io.connect('http://localhost:4000');

var message = document.getElementById("message");
var username = document.getElementById("username");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
const NUMSLICES = 1000000
// TODO: Fox, define the file here based on your UI

// Emit message
btn.addEventListener("click", function(){
  socket.emit("chat", {
      message: message.value,
      username: username.value
  });
  message.value = "";
});

// Broadcast [___] is typing...
message.addEventListener("keypress", function(){
    socket.emit("typing", username.value);
});

upload.addEventListener("click", function(){
    socket.emit("upload", username.value);
});

// Listen
socket.on("chat", function(data){
    output.innerHTML += "<p><strong>" + data.username + 
    ": </strong>" + data.message + "</p>";
    feedback.innerHTML = ""; // clears the [___] is typing... msg
});

var fileReader = new FileReader(), 
    slice = file.slice(0, 100000); 

fileReader.readAsArrayBuffer(slice); 
fileReader.onload = (evt) => {
    var arrayBuffer = fileReader.result; 
    socket.emit('slice upload', { 
        name: file.name, 
        type: file.type, 
        size: file.size, 
        data: arrayBuffer 
    }); 
}
