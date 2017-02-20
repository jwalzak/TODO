<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TODO:LIST</title>
    <link rel="stylesheet" href="style/main.css">
    <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>
    <form  method="POST" class="task" id="task">
        <input type="text" id="desc" name="desc" ><label>Task description</label>
        <br/>
        <select name="priority" id="priority">
            <option name="lowest" value="1" selected="selected">!</option>
            <option name="lower" value="2">!!</option>
            <option name="middle" value="3">!!!</option>
            <option name="higher" value="4">!!!!</option>
            <option name="highest" value="5">!!!!!</option>
        </select>
        <label>Priority</label>
        <br/>
        <input type="submit" name="submit" id="submit">
    </form>
    <div id="wall">
        
    </div>
</body>
</html>
