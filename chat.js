var socket = io.connect('http://localhost:4000');

var message = document.getElementById("message");
var username = document.getElementById("username");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var img = document.getElementById("filebox").files[0];
var upload = document.getElementById("upload");
var imgChunks = [];

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

socket.on("typing", function(data){
    feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
});

socket.on("img-chunk", function(chunk){
    imgChunks.push(chunk);
    img.setAttribute ("src", "data:image/jpeg;base64" +
    window.btoa(imgChunks));
});
