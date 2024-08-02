<?php
// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");
mysqli_set_charset($con, "utf8");

// 저장된 데이터를 불러오기 위한 SELECT 쿼리
$sql = "SELECT * FROM study";

// 쿼리 실행
$result = mysqli_query($con, $sql);

// 결과를 배열에 저장
$todos = array();
while ($row = mysqli_fetch_assoc($result)) {
    // 각 행을 별도의 객체로 생성하여 배열에 추가
    $todo = array(
        'id' => $row['user_id'],
        'date' => $row['date'],
        'hours' => $row['hours'],
        'minutes' => $row['minutes'],
        'seconds' => $row['seconds']
    );
    $todos[] = $todo;
}

// 데이터베이스 연결 닫기
mysqli_close($con);

// JSON 형식으로 데이터 출력
echo json_encode($todos);

?>
