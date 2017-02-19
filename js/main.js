//Onload event.
$(document).ready(function(){
    $("#task").click(function(e){
        e.preventDefault(),
    //Upload new task to the DB
   $.post("Connect.php?action=newTask", $(this).serialize(), addTask);
    });
        getTask();
});

//Gets the json from Connect.php
function getTask() {
    $.get("Connect.php?action=list", function(res){
        addTask(res);
        console.log(res);
    });
}

//Attaches tasks to the HTML document.
function addTask(content){

    for(var i = 0; i<content.length; i++){
    $("#wall").append($("<h3>").text("Priority: " + content[i].priority));
    $("#wall").append($("<h3>").text("Description: " + content[i].description));
    $("#wall").append($("<h3>").text("Date Created: " + content[i].dateCreated));
}
    console.log(content);
    }

