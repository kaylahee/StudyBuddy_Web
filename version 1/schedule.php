<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyBuddy</title>
    <link rel="stylesheet" href="schedule.css">
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
        <div class="calendar-container">
            <div class="calendar-header">
                <button id="prev-month"><</button>
                <h2 id="calendar-month"></h2>
                <button id="next-month">></button>
            </div>
            <div class="calendar-weekdays">
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>
            <div id="calendar"></div>
        </div>
        <div class="todo-container">
            <h2 id="selected-date"></h2>
            <ul id="todo-list"></ul>
            <input type="text" id="todo-input" placeholder="할 일 추가">
            <button onclick="addTodo()">추가</button>
        </div>
    </div>

    <!-- 모달 창 -->
    <div id="myModal" class="modal">
        <div class="modal-content">
            <button class="close-btn" onclick="closeModal()">x</button>
            <p>년도와 월을 선택하세요:</p>
            <input type="number" id="yearInput" placeholder="년도">
            <input type="number" id="monthInput" placeholder="월">
            <button onclick="changeMonth()">변경</button>
        </div>
    </div>

    <script src="ex.js"></script>
</body>
</html>
