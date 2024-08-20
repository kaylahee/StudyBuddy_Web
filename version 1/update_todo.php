<?php
session_start();
include('db_connect.php');

if (isset($_SESSION['user_id'])) {
    $id = $_POST['id'];
    $text = $_POST['text'];
    $completed = $_POST['completed'];

    $query = "UPDATE todos SET todo_text = '$text', completed = '$completed' WHERE id = '$id'";
    if (mysqli_query($conn, $query)) {
        echo 'Todo updated successfully';
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }
} else {
    echo "로그인이 필요합니다.";
}
?>
