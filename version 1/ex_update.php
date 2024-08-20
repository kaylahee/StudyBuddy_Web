<?php
// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");
mysqli_set_charset($con, "utf8");

// 요청된 데이터 받기
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$todo_text = $data['todo_text'];

// 데이터베이스에서 해당 id의 todo_text 업데이트
$sql = "UPDATE todos SET todo_text = '$todo_text' WHERE id = '$id'";

// 쿼리 실행
if (mysqli_query($con, $sql)) {
    echo "일정이 성공적으로 수정되었습니다.";
} else {
    echo "일정 수정 중 오류 발생: " . mysqli_error($con);
}

// 데이터베이스 연결 닫기
mysqli_close($con);
?>
