//ToDo task lister
//Coder: Jason Walzak
//Date: February 26 2017

//Onload event.
$(document).ready(function(){
    getTask();
    $("#task").submit(function(e){
        e.preventDefault();
        //Upload new task to the DB
        $.post("Connect.php?action=newTask", $(this).serialize(), function(res){
            console.log(res);
            getTask();
        });
    });
    sortFunc();
    allCom();
});

//Gets the json from Connect.php called in the initial load
function getTask() {
    $.get("Connect.php?action=list", function(res){
        //Remove current loaded data.
        $("#desc").val('');
        $("#priority").val('1');
        $("#wall").empty();
        addTask(res);
    });
}//End getTask

//Attaches tasks to the HTML document.
function addTask(content){
    $("#wall").empty();
    for(var i = 0; i<content.length; i++){
    //Template for inserting the HTML
    var taskDiv = '<div class="taskStyle" id=div' + content[i].id + '>';
    var deleteRadio = '<label for="delete">Delete</label><input type="radio" name="del' + content[i].id + '"class="delete"><br />';
    var midInfo = '<h3> Priority: ' + content[i].priority +
                  '</h3><h3>Description: ' + content[i].description +
                  '</h3><h3>Date Created: ' + content[i].dateCreated;
    //For closing the string. Put at the end.
    var endTask = '</h3></div>';
    //Display when the task is complete
    var complete = '<div class="complete"><p>DONE</p></div>';
    //For completed tasks to show up. Put before endTask and after taskDiv
    var taskDivCompleted = '<h3>Date Completed: ' + content[i].dateCompleted;
    //Update
    var $update =   $("<a>").attr('href', "#").attr('id', content[i].id).text("Update");

    $update.click(function(e){
        e.preventDefault();
        updatePost(this.id);
    });

        //Shows tasks that have been completed.
        //Won't show the completed time of something that hasn't been completed.
        if(content[i].completed == 1){
            $("#wall").append(complete + taskDiv + deleteRadio + midInfo + taskDivCompleted + endTask);
            changeStatus(content[i].id);
        }//End if

        //Will show tasks that have not been completed
        else if(content[i].completed == 0){
            $("#wall").append(taskDiv + deleteRadio).append($update).append(midInfo + endTask);
            changeStatus(content[i].id);
        }//End else if
    }//End for
}//End function

//Sends a php request on change when the radio button is selected
function sortFunc(){
    $("input[type=radio][name=sort]").change(function(){
        if(this.value == "sortPri"){
            $.post("Connect.php?action=priSort", $(this).serialize(), function(res){
                $("#wall").empty;
                addTask(res);
                });//End post
        }//End if
        else if(this.value == "sortDate"){
            $.post("Connect.php?action=dateSort", $(this).serialize(), function(res){
                $("#wall").clear;
                addTask(res);
            });//End post
        }//End else if
    })//End input function
}//End sortFunc

function allCom(){
    $("input[type=radio][name=comAll]").change(function(){
        if(this.value == "completed"){
            $.post("Connect.php?action=complete", $(this).serialize(), function(res){
                addTask(res);
            });
        }//End if
        else if(this.value == "all"){
                getTask();
        }//End else if
    });
}//And allCom

//The delete function
function changeStatus(radioId){
     if($("input[type=radio][name='del"+ radioId + "']").hasClass("delete")){
        $("input[type=radio][name='del"+ radioId + "']").change(function(){
            $.post("Connect.php?action=delete&id='" + radioId + "'", $(this).serialize(), function(res){
                console.log(res);
                getTask();
            });//End post
        });//End input change function
    }//End if
}//End changeStatus

var updatePost = function(id){
    $.post("Connect.php?action=update", 'updateId=' + id, function(res){
        console.log(res);
        getTask();
    });
    console.log("here");
}//End updatePost()
