<?php
// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");
mysqli_set_charset($con, "utf8");

// 저장된 데이터를 불러오기 위한 SELECT 쿼리
$sql = "SELECT * FROM diaries";

// 쿼리 실행
$result = mysqli_query($con, $sql);

// 결과를 배열에 저장
$diaries = array();
while ($row = mysqli_fetch_assoc($result)) {
    // 각 행을 별도의 객체로 생성하여 배열에 추가
    $diary = array(
        'id' => $row['user_id'],
        'date' => $row['date'],
        'content' => $row['feedback'],
        'weather' => $row['weather'],
        'emotion' => $row['emotion']
    );
    $diaries[] = $diary;
}

// 데이터베이스 연결 닫기
mysqli_close($con);

// JSON 형식으로 데이터 출력
echo json_encode($diaries);

?>
