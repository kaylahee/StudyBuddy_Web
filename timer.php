<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyBuddy</title>
    <link rel="stylesheet" href="timer.css">
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
    <div class="container">
        <div class="left">
            <div class="timer-container">
                <div id="progress" class="circle">
                    <div class="inside-circle">25:00</div>
                </div>
                <div class="timer-inputs">
                    <input type="number" id="minutes-input" value="25" min="0">
                    <label for="minutes-input">분</label>
                </div>
                <div class="timer-buttons">
                    <button onclick="setTimer()">설정</button>
                    <button onclick="startTimer()">시작</button>
                    <button onclick="pauseTimer()">중지</button>
                    <button onclick="resetTimer()">종료</button>
                    <audio id="alarm-sound" src="alarm.mp3" preload="auto"></audio>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="music">
                <h2>음악 선택</h2>
                <div class="music-selection">
                    <div class="music-item">
                        <img id="music1" src="firewood_background.jpg" alt="음악 1">
                        <!-- <p>장작 타는 소리</p> -->
                        <button class="play-button" onclick="playMusic('music1')">재생</button>
                        <button class="pause-button" onclick="pauseMusic('music1')">정지</button>
                    </div>
                    <div class="music-item">
                        <img id="music2" src="rain_background.jpg" alt="음악 2">
                        <!-- <p>빗소리</p> -->
                        <button class="play-button" onclick="playMusic('music2')">재생</button>
                        <button class="pause-button" onclick="pauseMusic('music2')">정지</button>
                    </div>
                    <div class="music-item">
                        <img id="music3" src="valley_background.jpg" alt="음악 3">
                        <!-- <p>계곡 소리</p> -->
                        <button class="play-button" onclick="playMusic('music3')">재생</button>
                        <button class="pause-button" onclick="pauseMusic('music3')">정지</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="custom-alert" class="custom-alert">
        <div class="alert-content">
          <span class="close-alert" onclick="closeCustomAlert()">&times;</span>
          <p>뽀모도로가 끝났습니다. 휴식하세요!</p>
        </div>
    </div>
    <script src="timer.js"></script>
</body>
</html>
