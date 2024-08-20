<?php

// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");
mysqli_set_charset($con, "utf8");

// 저장된 데이터를 불러오기 위한 SELECT 쿼리
$sql = "SELECT * FROM users";

// 쿼리 실행
$result = mysqli_query($con, $sql);

// 결과를 배열에 저장
$infos = array();
while ($row = mysqli_fetch_assoc($result)) {
    // 각 행을 별도의 객체로 생성하여 배열에 추가
    $info = array(
        'id' => $row['user_id'],
        'user_name' => $row['name'],
        'user_email' => $row['email'],
        'password' => $row['password'],
        'regist_day' => $row['regist_day'],
        'inform' => $row['inform'],
        'profile' => $row['profile_picture']
    );
    $infos[] = $info;
}

// 데이터베이스 연결 닫기
mysqli_close($con);

// JSON 형식으로 데이터 출력
echo json_encode($infos); // JavaScript로 사용자 정보 출력
?>
