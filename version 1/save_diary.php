<?php

// POST로 전송된 JSON 데이터 가져오기
$data = file_get_contents('php://input');

// JSON 형식의 데이터를 PHP 배열로 변환
$data_array = json_decode($data, true);

// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");

// POST 데이터를 받음
$date = $data_array['date'];
$weather = $data_array['weather'];
$feedback = $data_array['feedback'];
$emotion = $data_array['emotion'];
$user_id = $data_array['user_id'];

echo $date;
echo $weather;
echo $feedback;
echo $emotion;

// SQL 삽입문
$sql = "INSERT INTO diaries (user_id, date, weather, feedback, emotion) VALUES ('$user_id', '$date', '$weather', '$feedback', '$emotion')";

// 쿼리 실행
if (mysqli_query($con, $sql)) {
    echo "일기가 성공적으로 기록되었습니다.";
} else {
    echo "일기 기록 중 오류 발생: " . mysqli_error($con);
}

$con->close();
?>
