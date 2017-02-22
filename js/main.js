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
}

//Attaches tasks to the HTML document.
function addTask(content){

    console.log(content);
    for(var i = 0; i<content.length; i++){ 
    //Template for inserting the HTML
    var taskDiv = '<div class="taskStyle" id=div' + content[i].id + '>';

    var deleteButton = '<div id="' + content[i].id + '" style="height: 70px; width: 70px; float: right;"><i class="fa fa-window-close fa-2x closeBox" aria-hidden="true"></i></div>';
    var updButton = '<i class="fa fa-plus-square fa-2x closeBox" id="update" aria-hidden="true"></i>';
    var midInfo = '<h3> Priority: ' + content[i].priority + 
                  '</h3><h3>Description: ' + content[i].description + 
                  '</h3><h3>Date Created: ' + content[i].dateCreated; 
    

    //For closing the string. Put at the end.
    var endTask = '</h3></div>';
    //For completed tasks to show up. Put before endTask and after taskDiv
    var taskDivCompleted = '<h3>Date Completed: ' + content[i].dateCompleted;
        if(content[i].completed == 1){
            $("#wall").append(taskDiv + deleteButton + updButton + midInfo + taskDivCompleted + endTask);
        }//End if

        else if(content[i].completed == 0){
            $("#wall").append(taskDiv + deleteButton + updButton + midInfo + endTask);
        }//End else if
        $("#" + content[i].id).click(function(e){
            console.log("do it");
            var id = this.id;
            deleteFunc(id);
        });
    }//End for

}//End function


//Sends a php request on change when the radio button is selected
function sortFunc(){
    $("input[type=radio][name=sort]").change(function(){
        if(this.value == "sortPri"){
            $.post("Connect.php?action=priSort", $(this).serialize(), function(res){
                    console.log(res);
                    $("#wall").empty();
                    addTask(res);
                });//End post
        }//End if
        else if(this.value == "sortDate"){
            $.post("Connect.php?action=dateSort", $(this).serialize(), function(res){
                $("#wall").empty();
                addTask(res);
            });//End post
        }//End else if
    })//End input function
}//End sort func


function deleteFunc(id){

    $.post("Connect.php?action=delete", id.serialize, function(res){
        console.log(res);
        getTask();
    });
}//end deleteFunc

function updateFunc(){
    $.post("Connect.php?action=update", $(this).serialize, function(res){

    });
}//End updateFunc
