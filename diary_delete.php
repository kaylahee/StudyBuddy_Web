<?php
// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");

// POST로 전송된 데이터 가져오기
$Deletedate = $_POST['id'];

echo $Deletedate;

// 삭제할 일정을 데이터베이스에서 삭제하는 SQL 쿼리
$sql = "DELETE FROM diaries WHERE date = '$Deletedate';";

// 쿼리 실행
if (mysqli_query($con, $sql)) {
    echo "일기가 성공적으로 삭제되었습니다.";
} else {
    echo "일기 삭제 중 오류 발생: " . mysqli_error($con);
}

// 데이터베이스 연결 닫기
mysqli_close($con);
?>
