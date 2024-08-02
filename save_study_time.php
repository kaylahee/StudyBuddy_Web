<?php

$data = file_get_contents('php://input');
$data_array = json_decode($data, true);

$user_id = $data_array['user_id'];
$date = $data_array['date'];
$studyHours = $data_array['studyHours'];
$studyMinutes = $data_array['studyMinutes'];
$studySeconds = $data_array['studySeconds'];

// 데이터베이스 연결 생성
$con = mysqli_connect("localhost", "root", "", "taskblog");

// 데이터베이스에 공부 시간 저장
// 특정 날짜에 데이터가 존재하는지 확인
$checkSql = "SELECT * FROM study WHERE user_id = '$user_id' AND date = '$date'";
$result = $con->query($checkSql);

if ($result->num_rows > 0) {
    // 데이터가 존재하면 업데이트
    $sql = "UPDATE study SET hours = '$studyHours', minutes = '$studyMinutes', seconds = '$studySeconds' WHERE user_id = '$user_id' AND date = '$date'";
} else {
    // 데이터가 존재하지 않으면 삽입
    $sql = "INSERT INTO study (user_id, user_name, date, hours, minutes, seconds, created_at)
            SELECT '$user_id', u.name, '$date', '0', '0', '0', NOW()
            FROM users u
            WHERE u.user_id = '$user_id';";
}

mysqli_query($con, $sql);  // $sql 에 저장된 명령 실행
mysqli_close($con);
?>
