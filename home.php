<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyBuddy</title>
    <link rel="stylesheet" href="home.css">
    <script src="https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <header>
        <nav>
            <img src="logo_white.png" alt="TaskBlog Logo" class="logo">
            <ul class="nav-links">
                <li><a href="home.php">홈</a></li>
                <li><a href="schedule.php">일정 관리</a></li>
                <li><a href="timer.php">집중</a></li>
                <li><a href="blog.php">한 줄 일기</a></li>
                <li><a href="myaccount.php">내 계정</a></li>
                <li><a href="main.html">로그아웃</a></li>
            </ul>
        </nav>
    </header>
    <?php
    // 사용자 ID를 세션이나 다른 방법으로 받아오도록 설정
    session_start();
    $user_id = $_SESSION['user_id']; // 예: 세션에서 사용자 ID를 가져오는 방법
    $date = date( 'Y-m-d' );

    // 데이터베이스 연결
    $con = mysqli_connect("localhost", "root", "", "taskblog");

    // 사용자 정보 조회
    $user_sql = "SELECT name, inform, profile_picture FROM users WHERE user_id='$user_id'";
    $user_result = $con->query($user_sql);

    if ($user_result->num_rows > 0) {
        $user_row = $user_result->fetch_assoc();
        $username = $user_row['name'];
        $inform = $user_row['inform'];
        $profile = $user_row['profile_picture'];
    } else {
        $username = "사용자 이름";
        $inform = "";
        $profile = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMDlfMTQy%2FMDAxNjczMjcyMzM5NDc1.LP3PP6iznm9ouaShogNlQfdptnJIZDSz1CzuG_Xz5QEg.hG18t11MaUqpvB_ENad1dqreuEaZZO4yUeeHxQklAicg.JPEG.omytak%2FIMG_7643.JPG&type=a340";
    }

    // 공부 시간 조회
    $time_sql = "SELECT hours, minutes, seconds FROM study WHERE user_id='$user_id' AND date='$date'";
    $time_result = $con->query($time_sql);

    if ($time_result->num_rows > 0) {
        $time_row = $time_result->fetch_assoc();
        $studyHours = $time_row['hours'];
        $studyMinutes = $time_row['minutes'];
        $studySeconds = $time_row['seconds'];
    } else {
        $studyHours = 0;
        $studyMinutes = 0;
        $studySeconds = 0;
    }

    $con->close();
    ?>
    <!-- 그리드를 포함한 컨테이너 -->
    <div class="container">
        <section class="left-panel">
            <div class="profile">
            <img id="profile-picture-preview" src="<?php echo htmlspecialchars($profile); ?>" alt="프로필 사진">
            <h2 id="username"><?php echo htmlspecialchars($username); ?></h2>
            <p id="inform"><?php echo htmlspecialchars($inform); ?></p>
            </div>
        </section>
        <section class="right-panel">
            <h3>공부 시간</h3>
            <span id="stopwatch"><?php echo sprintf("%02d:%02d:%02d", $studyHours, $studyMinutes, $studySeconds); ?></span>
            <div class="study-time">
                <button id="start-study-button">공부 시작</button>
                <button id="pause-button">쉬는 시간</button>
            </div>
            <div class="calendar-container">
                <h3>공부 통계</h3>
                <div id="calendar-container"></div>
            </div>
        </section>
    </div>
    <script src="home.js"></script>
</body>
</html>
