<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TODO:LIST</title>
    <script type="text/javascript" src="js/jquery-3.1.1.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</head>
<body>
    <form  method="POST" class="task" id="task">
        <input type="text" id="desc" name="desc" ><label>Task description</label>
        <br/>
        <select name="priority" id="priority">
            <option value="1">!</option>
            <option value="2">!!</option>
            <option value="3">!!!</option>
            <option value="4">!!!!</option>
            <option value="5">!!!!!</option>
        </select>
        <label>Priority</label>
        <br/>
        <input type="submit" name="submit" id="submit">
    </form>
    <div id="wall">
        
    </div>
</body>
</html>
