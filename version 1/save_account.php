<?php

// POST로 전송된 JSON 데이터 가져오기
$data = file_get_contents('php://input');

// JSON 형식의 데이터를 PHP 배열로 변환
$data_array = json_decode($data, true);

// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");

// 입력값 받기
$user_id = $data_array['user_id'];
$inform = $data_array['inform'];
$username = $data_array['username'];
$email = $data_array['email'];
$password = $data_array['password'];
$profilePicture = $data_array['profilePicture'];

// SQL 삽입문
$sql = "UPDATE users SET inform='$inform', name='$username', email='$email', password='$password', profile_picture='$profilePicture' WHERE user_id='$user_id'";

// 쿼리 실행
if (mysqli_query($con, $sql)) {
    echo "사용자 정보가 성공적으로 저장되었습니다.";
} else {
    echo "사용자 정보 저장 중 오류 발생: " . mysqli_error($con);
}

$con->close();
?>
