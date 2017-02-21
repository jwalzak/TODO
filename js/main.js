//Onload event.
$(document).ready(function(){
    getTask();
    $("#task").submit(function(e){
        e.preventDefault();
        //Upload new task to the DB
        $.post("Connect.php?action=newTask", $(this).serialize(), function(res){
            console.log(res);
            //Remove current loaded data.
            $("#desc").val('');
            $("#priority").val('');
            $("#wall").empty();
            getTask();
        });
    });
});

//Gets the json from Connect.php called in the initial load
function getTask() {
    $.get("Connect.php?action=list", function(res){
        addTask(res);
    });
}

//Attaches tasks to the HTML document.
function addTask(content){
    for(var i = 0; i<content.length; i++){
        if(content[i].completed == 1){
        $("#wall").append($("<h3>").addClass("taskStyle").text("Priority: " + content[i].priority));
        $("#wall").append($("<h3>").text("Description: " + content[i].description));
        $("#wall").append($("<h3>").text("Date Created: " + content[i].dateCreated));
        $("#wall").append($("<h3>").text("Date Completed: " + content[i].dateCompleted));
    }//End for
}//End if

    for(var i = 0; i<content.length; i++){  
        if(content[i].completed == 0){  
            $("#wall").append($("<h3>").addClass("taskStyle").text("Priority: " + content[i].   priority));
            $("#wall").append($("<h3>").text("Description: " + content[i].description));
            $("#wall").append($("<h3>").text("Date Created: " + content[i].dateCreated));
        }//end for
    }//End if
}//End function