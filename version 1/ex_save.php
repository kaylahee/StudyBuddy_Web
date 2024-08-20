<?php
// POST로 전송된 JSON 데이터 가져오기
$data = file_get_contents('php://input');

// JSON 형식의 데이터를 PHP 배열로 변환
$data_array = json_decode($data, true);

// 'todoText' 값 추출
$selectedDate = $data_array['selectedDate'];
$selectedDate = trim($selectedDate); // 공백 제거

$dateParts = explode(" / ", $selectedDate);

$currentYear = $dateParts[0];
$currentMonth = $dateParts[1];
$currentDay = $dateParts[2];

$savedDate = date("Y-m-d H:i", mktime(0, 0, 0, $currentMonth, $currentDay, $currentYear));

$user_id = $data_array['user_id'];
$date = $savedDate;
$todo_text = $data_array['todoText'];
$completed = $data_array['completed'];

$con = mysqli_connect("localhost", "root", "", "taskblog");

$sql = "insert into todos(user_id, todo_text, date, completed) ";
	$sql .= "values('$user_id', '$todo_text', '$date', '$completed')";

mysqli_query($con, $sql);  // $sql 에 저장된 명령 실행
mysqli_close($con);
?>