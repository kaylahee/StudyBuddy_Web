<?php
session_start(); // 세션 시작

// 세션에서 사용자 ID 가져오기
$user_id = intval($_SESSION['user_id']);

// JavaScript 변수로 사용자 ID 출력
echo json_encode($user_id); // JavaScript로 사용자 ID 출력
?>
