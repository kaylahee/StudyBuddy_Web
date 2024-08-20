<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyBuddy</title>
    <link rel="stylesheet" href="myaccount.css">
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
        <div class="container">
            <h1>프로필 수정</h1>
            <form id="profile-form">
                <label for="profile-picture">프로필 사진</label>
                <div class="profile-picture-container">
                    <img id="profile-picture-preview" src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMDRfMTA4%2FMDAxNjY3NTQ5NTgxODg5.YHrEdBjBxnyHG2PpI60zMys_dWjv99oCZnFFY9lOZdAg.d3z5KAYvJqN-TeYSqQsG-bs5i38XMXKtElntGy6Yo4Ug.JPEG.dbdidna23%2F27.jpg&type=a340" alt="프로필 사진">
                    <input type="text" id="profile-picture" name="profile-picture" placeholder="이미지 URL 입력">
                </div>
                
                <label for="username">사용자 이름</label>
                <input type="text" id="username" name="username" required>

                <label for="inform">자기 소개</label>
                <input type="text" id="inform" name="inform" required>
                
                <label for="email">이메일</label>
                <input type="email" id="email" name="email" required>
                
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password">
                
                <label for="confirm-password">비밀번호 확인</label>
                <input type="password" id="confirm-password" name="confirm-password">

                <div class="show-password-container">
                    <input type="checkbox" id="show-password">
                    <label for="show-password">비밀번호 보이기</label>
                </div>
                
                <button type="button" onclick="saveInform()">수정하기</button>
            </form>
        </div>
    </div>

    <script src="myaccount.js"></script>
</body>
</html>
