<?php
// 클라이언트에서 전송된 JSON 데이터 가져오기
$data = file_get_contents('php://input');

// JSON 형식의 데이터를 PHP 배열로 변환
$data_array = json_decode($data, true);

// Base64 형식의 이미지 데이터
$base64Image = $data_array['base64Image'];

// echo $base64Image;

// 데이터베이스 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");

// 이미지 데이터를 데이터베이스에 저장하는 SQL 쿼리
$sql = "UPDATE users SET profile='$base64Image' WHERE user_id='$user_id'";

//쿼리 실행
if (mysqli_query($con, $sql)) {
    echo "이미지가 성공적으로 저장되었습니다.";
} else {
    echo "이미지 저장 중 오류 발생: " . mysqli_error($con);
}

// 데이터베이스 연결 닫기
mysqli_close($con);
?>
