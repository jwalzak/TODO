<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>//TODO:LIST</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <link rel="stylesheet" href="style/main.css">
    <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>
<header>
    <h1>//Todo:</h1>
    <h5>An AJAX and jQuery to do list</h5>
</header>
<div id="form" class="form">
    <form  method="POST" class="task" id="task">
    <div id="input" class="input">
        <input type="text" class="desc" id="desc" name="desc" ><label for="desc">Task description</label>
        <br/>
        <select name="priority" id="priority" class="priority">
            <option name="lowest" value="1" selected="selected">!</option>
            <option name="lower" value="2">!!</option>
            <option name="middle" value="3">!!!</option>
            <option name="higher" value="4">!!!!</option>
            <option name="highest" value="5">!!!!!</option>
        </select>
        <label for="priority">Priority</label>
        <br/>
        <input type="submit" name="submit" id="submit">
        </div>
        <div id="sort" class="sort">
            <h3>Sort</h3>
            <input type="radio" name="sort" id="sortPri" value="sortPri"><label for="sortPri">Priority</label>
            <input type="radio" name="sort" id="sortDate" value="sortDate"><label for="sortDate">Date</label>
        </div>
    </form>
</div>
    <div id="wall">
        
    </div>
</body>
</html>
