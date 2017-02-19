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
        newTask($conn);
    }
}//End isset if


    function toDoList($connection){
        // $listArray = array();

        // //Select String
        // $q = "SELECT description, priority, dateCreated, dateCompleted FROM task;";

        // //Get results
        // $results = $connection->query($q);

        // while($info = $resutls->fetch_assoc()){
        //     //Get each task from the DB
        //     array_push($listArray, $info);
        // }//End while
        $test = array("help"=>"i", "dont"=>"know", "what"=>"I", "am"=>"doing");
        echo json_encode($test);
    }//End toDoList

    fucntion newTask($connection){
        $q = "INSERT into task (description, priority, dateCreated) VALUES 
    }//End newTask
?>