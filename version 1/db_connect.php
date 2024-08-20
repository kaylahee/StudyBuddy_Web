<?php
$servername = "localhost"; // 데이터베이스 호스트명
$username = "root"; // 데이터베이스 사용자명
$password = ""; // 데이터베이스 암호
$dbname = "taskblog"; // 사용할 데이터베이스명

// 데이터베이스 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
