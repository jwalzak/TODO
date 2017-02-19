//Onload event.
$(document).ready(function(){
    $("#task").click(function(e){
        e.preventDefault();
        //alert("default prevented");
    });
        getTask();
});

//Gets the json from Connect.php
function getTask() {
    $.get("Connect.php?action=list", function(res){
        addTask(res);
    });
}

//Attaches tasks to the HTML document.
function addTask(content){
    $("#wall").append(content.help + " ");
    $("#wall").append(content.dont);
    }