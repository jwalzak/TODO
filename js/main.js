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
    for(var i = 0; i<content.length; i++){ 
    
    //Template for inserting the HTML
    var taskDiv = '<div class="taskStyle" id=div' + content[i].id + '>';
    var deleteRadio = '<label for="delete">Delete</label><input type="radio" name="del' + content[i].id + '"class="delete"><br />';
    var updateRadio = '<label for="update">Update</label><input type="radio" name="upd' + content[i].id + '"class="update">';
    var midInfo = '<h3> Priority: ' + content[i].priority + 
                  '</h3><h3>Description: ' + content[i].description + 
                  '</h3><h3>Date Created: ' + content[i].dateCreated; 
    //For closing the string. Put at the end.
    var endTask = '</h3></div>';
    //Display when the task is complete
    var complete = '<div class="complete"><p>DONE</p></div>';
    //For completed tasks to show up. Put before endTask and after taskDiv
    var taskDivCompleted = '<h3>Date Completed: ' + content[i].dateCompleted;
    var $updateClick = $("<a>").attr('herf', "#").text;

        //Shows tasks that have been completed.
        //Won't show the completed time of something that hasn't been completed.
        if(content[i].completed == 1){
            $("#wall").append(complete + taskDiv + deleteRadio + midInfo + taskDivCompleted + endTask);
            updateStatus(content[i].id);
            changeStatus(content[i].id);
        }//End if
        
        //Will show tasks that have not been completed
        else if(content[i].completed == 0){
            $("#wall").append(taskDiv + deleteRadio + updateClick + midInfo + endTask);
            updateStatus(content[i].id);
            changeStatus(content[i].id);
        }//End else if
        
    }//End for

}//End function

//Sends a php request on change when the radio button is selected
function sortFunc(){
    $("input[type=radio][name=sort]").change(function(){
        if(this.value == "sortPri"){
            $.post("Connect.php?action=priSort", $(this).serialize(), function(res){
                    addTask(res);
                });//End post
        }//End if
        else if(this.value == "sortDate"){
            $.post("Connect.php?action=dateSort", $(this).serialize(), function(res){
                addTask(res);
            });//End post
        }//End else if
    })//End input function
}//End sortFunc

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

$updateClick.click(function(e){
    e.preventDefault();
    $.post('Connect.php?action=update', 'update=' + radioId, function(res){
    console.log(res);
    });
});



  // else if($("input[type=radio][name='upd"+ radioId + "']").hasClass("update")){
  //       $("input[type=radio][name='upd"+ radioId + "']").change(function(){
  //           $.post("Connect.php?action=update&id='" + radioId + "'", $(this).serialize(), function(res){
  //               console.log(res);
  //               getTask();
  //           });//End post function
  //       });//End input change function
  //   }//End else if