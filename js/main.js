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
    //Template for inserting the HTML
    var taskDiv = '<div class="taskStyle" id=' + content[i].id + 
                 '<h3> Priority: ' + content[i].priority + 
                 '</h3><h3>Description: ' + content[i].description + 
                 '</h3><h3>Date Created: ' + content[i].dateCreated; 
    //For closing the string. Put at the end.
    //I can separate completed and not completed as the ones that show up
    var endTask = '</h3></div>';
    //For completed tasks to show up. Put before endTask and after taskDiv
    var taskDivCompleted = '<h3>Date Completed: ' + content[i].dateCompleted;
        if(content[i].completed == 1){
        $("#wall").append(taskDiv + taskDivCompleted + endTask);
        }//End if

        else if(content[i].completed == 0){
            $("#wall").append(taskDiv + endTask);
        }//End else if
    }//End for
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