<?php

header("Content-Type:applicaton/json");

//Database variables
define("HOST", "localhost");
define("USER", "lampuser");
define("PASSWORD", "password");
define("DATABASE", "lamp2proj1");

//Ensure there is a GET string in the URL
if(isset($_GET['action'])){

    //Connection data
    $conn = new mysqli(HOST, USER, PASSWORD, DATABASE);

    if($conn->connect_error){
        die("Could not connect: " . $conn->connect_error);
    }

    //Load data base items.
    if($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['action'] == 'list'){
        toDoList($conn);
    }
    else if($_SERVER['REQUEST_METHOD'] == 'POST' && $_GET['action'] == 'newTask'){
        newEntry($conn);
    }//End else if

    else if($_GET['action'] == "priSort" && $_SERVER['REQUEST_METHOD'] == "POST"){
        priSort($conn);
    }//End else if

    else if($_GET['action'] == "dateSort" && $_SERVER['REQUEST_METHOD'] == "POST"){
        dateSort($conn);
    }//End else if

    else if($_GET['action'] == 'delete' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        deleteFunc($conn);
    }//End else if

    else if($_GET['action'] == 'update' && $_SERVER['REQUEST_METHOD'] == 'POST'){
        updateFunc($conn);
    }//End else if

    $conn->close();
}//End isset if


    function toDoList($connection){
         $listArray = array();

         //Select String
         $q = "SELECT id, description, priority, dateCreated, completed, dateCompleted FROM task";

         //Get results
         $results = $connection->query($q);

         while($info = $results->fetch_assoc()){
             //Get each task from the DB
             array_push($listArray, $info);
         }//End while

         $results->close();
        echo json_encode($listArray);
    }//End toDoList

//Updates the database and returns the values.
    function newEntry($connection){
        date_default_timezone_get("America/Toronto");
        $description = $_POST['desc'];
        $priority = (int)$_POST['priority'];
        $date = date("Y-m-d H:i:s");
        $completed = 0;
        $default = "default";

        $q1 = sprintf("INSERT INTO task 
                        (description, priority, dateCreated, completed, dateCompleted) 
                        VALUES ('%s', '%d', '%s', '%d', '%s')",
                        $description, $priority, $date, $completed, $default);

        $qRs = $connection->query($q1);

        $id = $connection->insert_id;

        $jsonArray = array(
            'id' => $id,
            'description' => $description,
            'priority' => $priority,
            'dateCreated' => $date
            );

        echo json_encode($jsonArray);
    }//End newTask

//Sorts the results by date.
    function dateSort($connection){
        $listArray = array();

         //Select String
         $q = "SELECT description, priority, dateCreated, completed, dateCompleted FROM task ORDER BY dateCreated desc";

         //Get results
         $results = $connection->query($q);

         while($info = $results->fetch_assoc()){
             //Get each task from the DB
             array_push($listArray, $info);
         }//End while

         $results->close();
        echo json_encode($listArray);
    }//End dateSort

//Sorts the results by priority
    function priSort($connection){
        $listArray = array();

         //Select String
         $q = "SELECT description, priority, dateCreated, completed, dateCompleted FROM task ORDER BY priority desc";

         //Get results
         $results = $connection->query($q);

         while($info = $results->fetch_assoc()){
             //Get each task from the DB
             array_push($listArray, $info);
         }//End while

         $results->close();
        echo json_encode($listArray);
    }//End priSort

//Deletes the DB entry
    function deleteFunc($connection){

    }//End deleteFunc

//Updates the completed status of a DB entry
    function updateFunc($connection){
        $q = "UPDATE task SET completed = 1 WHERE id=" . $id . ";";
    }//End updateFunc
?>