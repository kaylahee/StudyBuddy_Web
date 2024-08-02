<?php
// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");

$data = file_get_contents('php://input');

// 요청된 데이터 받기
$data_array = json_decode($data, true);
$id = $data_array['id'];
$completed = $data_array['completed'];

// 데이터베이스에서 해당 id의 completed 상태 업데이트
$sql = "UPDATE todos SET completed = '$completed' WHERE id = '$id'";

// 쿼리 실행
if (mysqli_query($con, $sql)) {
    echo "일정이 성공적으로 체크되었습니다.";
} else {
    echo "일정 체크 중 오류 발생: " . mysqli_error($con);
}

// 데이터베이스 연결 닫기
mysqli_close($con);
?>
