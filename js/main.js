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
            $("#priority").val('1');
            $("#wall").empty();
            getTask();
        });
    });
    sortFunc();
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


//Sends a php request on change when the radio button is selected
function sortFunc(){
    $("input[type=radio][name=sort]").change(function(){
        if(this.value == "sortPri"){
            console.log("ding");

            $.post("Connect.php?action=priSort", $(this).serialize(), function(res){
                console.log(res);
                $("#wall").empty();
                addTask(res);
            });//End post
        }//End if
        else if(this.value == "sortDate"){
            console.log("Date Ding");
            $.post("Connect.php?action=dateSort", $(this).serialize(), function(res){
                $("#wall").empty();
                addTask(res);
            });//End post
        }//End else if
    })//End input function
}//End sort fun