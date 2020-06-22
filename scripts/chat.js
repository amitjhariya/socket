//Create  connection
var socket = io.connect("http://162.241.65.73:8080/");

//Query DOM
var message = document.querySelector("#message");
// var handle = document.querySelector("#handle");
if(!sessionStorage.getItem("user")){
    var user=prompt("Please Enter Username")
    sessionStorage.setItem("user", user);
}

var handle =sessionStorage.getItem("user");

var btn = document.querySelector("#send");
var output  = document.querySelector("#output");
var feedback  = document.querySelector("#feedback");


//Emit event
btn.addEventListener("click", function () {
    socket.emit('chat', {
        handle: handle,
        message:message.value
    });
});

message.addEventListener("keydown", function () {
    socket.emit("typing", handle);
});


//Listen event
socket.on("chat", function (data) {
    if(!data.message){
        return null
    }
    if(data.handle===sessionStorage.getItem("user")){
        output.innerHTML+=`<div class="float-right">
<div class="chat-box-wrapper chat-box-wrapper-right">
    <div>
        <div class="chat-box">`+data.message +`</div>
        <small class="opacity-6">
            <i class="fa fa-calendar-alt mr-1"></i>
            11:01 AM | Yesterday
        </small>
    </div>
    <div>
        <div class="avatar-icon-wrapper ml-1">
            <div
                class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">
            </div>
            <div class="avatar-icon avatar-icon-lg rounded">
                <img src="images/avatars/3.jpg" alt="">
            </div>
        </div>
    </div>
</div>
</div>`;
console.log("User massage")
    }
    else{
        output.innerHTML+=`<div class="chat-box-wrapper"><div><div class="avatar-icon-wrapper mr-1">            <div
                class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg">
            </div>
            <div class="avatar-icon avatar-icon-lg rounded">
                <img src="images/avatars/2.jpg" alt="">
            </div>
        </div>
    </div>
    <div>
        <div class="chat-box">`+data.message +`</div>
        <small class="opacity-6">
            <i class="fa fa-calendar-alt mr-1"></i>
            11:01 AM | Yesterday
        </small>
    </div>
</div>`;
console.log("Admin massage")
    }
    

    feedback.innerHTML = "";
    $("#output").animate({
        scrollTop: $('#output').get(0).scrollHeight
      }, 2000);
    });

socket.on("typing", function (data) {
    
    feedback.innerHTML = "<p> " + data + " is typing ... </p>";
    setTimeout(function(){
        feedback.innerHTML=''
        console.log('clear feedback')
    }, 1000)
});
