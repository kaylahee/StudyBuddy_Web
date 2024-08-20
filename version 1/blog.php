<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyBuddy</title>
    <link rel="stylesheet" href="blog.css">
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

    <div class="main-content">
        <aside class="sidebar">
            <h2>한 줄 일기 목록</h2>
            <ul id="feedback-list">
                <!-- 피드백 목록이 여기에 추가됩니다 -->
            </ul>
        </aside>
        <div class="container">
            <form id="feedback-form">
                <h2>일기 작성</h2>
                <label for="date">날짜:</label>
                <input type="date" id="date" name="date" required>
                
                <div class="weather-buttons">
                    <div class="weather-button" data-weather="☀️">맑음☀️</div>
                    <div class="weather-button" data-weather="🌥️">흐림🌥️</div>
                    <div class="weather-button" data-weather="🌧️">비🌧️</div>
                    <div class="weather-button" data-weather="☁️">구름많음☁️</div>
                    <div class="weather-button" data-weather="❄️">눈❄️</div>
                </div>                

                <label for="feedback">오늘의 일기:</label>
                <textarea id="feedback" name="feedback" rows="4" required></textarea>

                <div class="emotion-buttons">
                    <div class="emotion-button" data-emotion="😊">매우좋음😊</div>
                    <div class="emotion-button" data-emotion="🙂">좋음🙂</div>
                    <div class="emotion-button" data-emotion="😐">보통😐</div>
                    <div class="emotion-button" data-emotion="😕">나쁨😕</div>
                    <div class="emotion-button" data-emotion="😔">매우나쁨😔</div>
                </div>

                <input type="hidden" id="emotion" name="emotion" required>
                <input type="hidden" id="weather" name="weather" required>

                <button type="submit">저장</button>
            </form>
        </div>
    </div>

    <script src="blog.js"></script>
</body>
</html>
