<?php
// 세션 시작
session_start();

// POST로 전송된 데이터 가져오기
$email = $_POST["email"];
$pass = $_POST["pass"];

// MySQL 서버와 연결
$con = mysqli_connect("localhost", "root", "", "taskblog");

// 이메일을 사용하여 사용자 정보 가져오기
$sql = "SELECT * FROM users WHERE email='$email'";
$result = mysqli_query($con, $sql);

$num_match = mysqli_num_rows($result);

if (!$num_match) {
    echo("
        <script>
            window.alert('등록되지 않은 회원입니다!')
            history.go(-1)
        </script>
    ");
} else {
    $row = mysqli_fetch_array($result);
    $db_pass = $row["password"];
    $user_id = $row["user_id"]; // 사용자 ID 가져오기

    mysqli_close($con);

    if ($pass != $db_pass) {
        echo("
            <script>
                window.alert('비밀번호가 틀립니다!')
                history.go(-1)
            </script>
        ");
        exit;
    } else {
        // 로그인 성공 시 사용자 ID를 세션에 저장
        $_SESSION["user_id"] = $user_id;

        // 기타 세션 정보 저장
        $_SESSION["useremail"] = $row["email"];
        $_SESSION["username"] = $row["name"];

        echo("
            <script>
                location.href = 'home.php';
            </script>
        ");
    }
}
?>
