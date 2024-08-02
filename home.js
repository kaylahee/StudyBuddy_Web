$(document).ready(function() {
    var data = {
        date: currentDate,
        user_id: user_id, 
        studyHours: hours, 
        studyMinutes: minutes, 
        studySeconds: seconds
    };

    // 서버로 데이터 전송
    $.ajax({
        type: "POST",
        url: "home.php",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
            console.log(response); // 성공적으로 저장되었을 때의 처리
        },
        error: function(xhr, status, error) {
            console.error("Error saving study time:", error);
        }
    });

    get_userID();
    loadUserProfile();
    loadStudyTime();
    renderCalendar();
});

let user_id;

function get_userID() {
    $.ajax({
        type: "GET",
        url: "get_userID.php", // PHP 파일의 경로를 입력합니다.
        success: function(response) {
            user_id = response; // user_id에 값 할당
        },
        error: function(xhr, status, error) {
            console.error("Error loading account data:", error);
        }
    });
}

get_userID();

function loadUserProfile() {
    $.ajax({
        type: "GET",
        url: "get_account.php", // PHP 파일의 경로를 입력합니다.
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = 0;
            decodedData.forEach(function(user) {
                if (user_id == user.id){
                    index = i;
                }
                i++;
            });
            user = decodedData;
            
            console.log(user[index].inform);
            // 다른 데이터 필드 업데이트
            document.getElementById('profile-picture-preview').src = user[index].profile;
            $('#username').text(user.username || user[index].user_name);
            $('#inform').text(user.username || user[index].inform);

            //console.log(user); // 성공적으로 로드된 데이터를 확인하기 위해 콘솔에 출력
        },
        error: function(xhr, status, error) {
            console.error("Error loading account data:", error);
        }
    });
}

// 타이머 상태를 나타내는 변수
var isTimerRunning = false;
var timerInterval;
var hours = 0;
var minutes = 0;
var seconds = 0;

// 현재 날짜를 로컬 스토리지에 저장된 날짜와 비교하여 초기화
var storedDate = localStorage.getItem('storedDate');
var currentDate = new Date().toISOString().slice(0, 10);

if (storedDate !== currentDate) {
    localStorage.setItem('storedDate', 0);
    localStorage.setItem('studyHours', 0);
    localStorage.setItem('studyMinutes', 0);
    localStorage.setItem('studySeconds', 0);
}

hours = parseInt(localStorage.getItem('studyHours')) || 0;
minutes = parseInt(localStorage.getItem('studyMinutes')) || 0;
seconds = parseInt(localStorage.getItem('studySeconds')) || 0;

// 공부 시작 버튼 클릭 이벤트 핸들러
document.getElementById('start-study-button').addEventListener('click', function() {
    console.log(isTimerRunning);
    if (!isTimerRunning) {
        startTimer();
    }
});

// 쉬는 시간 버튼 클릭 이벤트 핸들러
document.getElementById('pause-button').addEventListener('click', function() {
    console.log(isTimerRunning);
    if (isTimerRunning) {
        console.log(hours);
        updateCalendarColor_Text(hours);
        stopTimer();
    }
});

// 타이머 시작 함수
function startTimer() {
    isTimerRunning = true;
    $.ajax({
        type: "GET",
        url: "get_study_time.php",
        data: { user_id: user_id, date: currentDate }, // 사용자 ID를 서버에 전달하여 해당 사용자의 공부 시간을 가져옵니다.
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = -1;
            // console.log(decodedData);
            decodedData.forEach(function(stime) {
                // console.log(stime.id);
                if (user_id == stime.id){
                    index = i;
                }
                i++;
            });

            stime = decodedData;
            // console.log(stime);

            if (index >= 0 && user_id == decodedData[index]['id']) {
                stime = decodedData.filter(function(item) {
                    return item.id === user_id;
                });
                // console.log(stime);
            } else {
                stime = null;
            }
            
            // console.log(stime);

            for (let i = 0; i < stime.length; i++){
                if (stime[i]['date'] == currentDate){
                    // console.log(i);
                    tmp = i;
                }
            }
            // console.log(tmp);
            if (stime != null && index >= 0) {
                // console.log(stime[tmp]);
                // 서버에서 가져온 공부 시간이 있을 경우에만 시간 값을 업데이트합니다.
                hours = parseInt(stime[tmp]['hours']) || 0;
                minutes = parseInt(stime[tmp]['minutes']) || 0;
                seconds = parseInt(stime[tmp]['seconds']) || 0;
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading study time:", error);
        }
    });

    timerInterval = setInterval(updateTimer, 1000);
}

// 타이머 정지 함수
function stopTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    console.log("upload");
    saveStudyTime();
}

// 타이머 업데이트 함수
function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    displayTimer(hours, minutes, seconds);
}

function displayTimer(hours, minutes, seconds) {
    var formattedTime = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds);
    document.getElementById('stopwatch').textContent = formattedTime;
}

// 공부 시간을 로컬 스토리지에 저장하는 함수
// 공부 시간을 로컬 스토리지에 저장하고 서버에 전송하는 함수
function saveStudyTime() {    
    // console.log(hours, minutes, seconds);
    let lcurDate = new Date();
    let year = lcurDate.getFullYear();
    let month = String(lcurDate.getMonth() + 1).padStart(2, '0');
    let day = String(lcurDate.getDate()).padStart(2, '0');
    
    //오늘 날짜
    let lcurrDate = `${year}-${month}-${day}`;
    console.log(lcurrDate);

    date = lcurrDate;
    var data = {
        user_id: user_id, 
        date: date,
        studyHours: hours, 
        studyMinutes: minutes, 
        studySeconds: seconds
    };

    // 서버로 데이터 전송
    $.ajax({
        type: "POST",
        url: "save_study_time.php",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
            // console.log(response); // 성공적으로 저장되었을 때의 처리
        },
        error: function(xhr, status, error) {
            console.error("Error saving study time:", error);
        }
    });
    updateCalendarColor_Text(hours);
}


// 공부 시간 로드하기
function loadStudyTime() {
    console.log("load");
    let lcurDate = new Date();
    let year = lcurDate.getFullYear();
    let month = String(lcurDate.getMonth() + 1).padStart(2, '0');
    let day = String(lcurDate.getDate()).padStart(2, '0');
    
    //오늘 날짜
    let lcurrDate = `${year}-${month}-${day}`;
    console.log(lcurrDate);

    saveStudyTime()

    $.ajax({
        type: "GET",
        url: "get_study_time.php",
        data: { user_id: user_id, date: lcurrDate }, // 사용자 ID를 서버에 전달하여 해당 사용자의 공부 시간을 가져옵니다.
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = -1;
            // console.log(decodedData);
            decodedData.forEach(function(stime) {
                // console.log(stime.id);
                if (user_id == stime.id){
                    index = i;
                }
                i++;
            });

            stime = decodedData;
            // console.log(stime);

            if (index >= 0 && user_id == decodedData[index]['id']) {
                stime = decodedData.filter(function(item) {
                    return item.id === user_id;
                });
                // console.log(stime);
            } else {
                stime = null;
            }

            tmp = 0;
            for (let i = 0; i < stime.length; i++){
                if (stime[i]['date'] == currentDate){
                    // console.log(i);
                    tmp = i;
                }
            }
            // console.log(tmp);
            if (stime != null && index >= 0) {
                // console.log(stime[tmp]);
                // 서버에서 가져온 공부 시간이 있을 경우에만 시간 값을 업데이트합니다.
                hours = parseInt(stime[tmp]['hours']) || 0;
                minutes = parseInt(stime[tmp]['minutes']) || 0;
                seconds = parseInt(stime[tmp]['seconds']) || 0;
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading study time:", error);
        }
    });
}

// 달력 렌더링 함수
function renderCalendar() {
    console.log("render");
    var calendarContainer = document.getElementById('calendar-container');
    calendarContainer.innerHTML = '';

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    var startingDay = firstDayOfMonth.getDay(); // 현재 달의 첫째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 현재 달의 일수

    var calendarTable = document.createElement('table');
    var headerRow = document.createElement('tr');
    var weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    // 요일 헤더 생성
    for (var i = 0; i < 7; i++) {
        var th = document.createElement('th');
        th.textContent = weekdays[i];
        headerRow.appendChild(th);
    }
    calendarTable.appendChild(headerRow);

    var date = 1;
    
    // 달력에 날짜 채우기
    for (var i = 0; i < 6; i++) { // 최대 6주
        var row = document.createElement('tr');
        for (var j = 0; j < 7; j++) { // 일주일
            var cell = document.createElement('td');
            if ((i === 0 && j < startingDay) || date > daysInMonth) { // 이전 달이나 다음 달의 날짜 혹은 현재 달의 마지막 날 이후의 빈 칸
                cell.textContent = '';
                cell.classList.add('empty-cell');
            } else { // 현재 달의 날짜
                cell.textContent = date;
                date++;
            }
            row.appendChild(cell);
        }
        calendarTable.appendChild(row);
        if (date > daysInMonth && j === 6) break; // 모든 날짜가 채워지면 종료
    }

    calendarContainer.appendChild(calendarTable);
    updateCalendarColor();
}

// 공부 시간에 따라 배경색 설정
function getBackgroundColor(studyTime) {
    if (studyTime >= 3) {
        return 'green';
    } else if (studyTime >= 2) {
        return 'limegreen';
    } else if (studyTime >= 1) {
        return 'lightgreen';
    } else {
        return 'transparent';
    }
}

// 현재 날짜의 공부 시간에 따라 달력 색상 업데이트 함수
function updateCalendarColor() {
    console.log("update");
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var cells = document.querySelectorAll('td');
    
    $.ajax({
        type: "GET",
        url: "get_study_time.php",
        data: { user_id: user_id }, // 사용자 ID를 서버에 전달하여 해당 사용자의 공부 시간을 가져옵니다.
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = -1;
            // console.log(decodedData);
            decodedData.forEach(function(stime) {
                // console.log(stime.id);
                if (user_id == stime.id){
                    index = i;
                }
                i++;
            });

            stime = decodedData;
            // console.log(stime);

            if (index >= 0 && user_id == decodedData[index]['id']) {
                stime = decodedData.filter(function(item) {
                    return item.id === user_id;
                });
                // console.log(stime);
            } else {
                stime = null;
            }

            tmp = 0;
            for (let i = 0; i < stime.length; i++){
                if (stime[i]['date'] == currentDate){
                    // console.log(i);
                    tmp = i;
                }
            }
            // console.log(tmp);
            if (stime != null && index >= 0) {
                // console.log(stime[tmp]);
                // 서버에서 가져온 공부 시간이 있을 경우에만 시간 값을 업데이트합니다.
                hours = parseInt(stime[tmp]['hours']) || 0;
                minutes = parseInt(stime[tmp]['minutes']) || 0;
                seconds = parseInt(stime[tmp]['seconds']) || 0;
            }

            stime.forEach(element => {
                // console.log(element.date);
                cells.forEach(function(cell) {
                    let formattedMonth = String(currentDate.getMonth()+1).padStart(2, '0');
                    let formattedDay = String(cell.textContent).padStart(2, '0');
                    //반복문으로 형성된 날짜
                    let formattedDate = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;

                    let curDate = new Date();
                    let year = curDate.getFullYear();
                    let month = String(curDate.getMonth() + 1).padStart(2, '0');
                    let day = String(curDate.getDate()).padStart(2, '0');
                    //오늘 날짜
                    let currDate = `${year}-${month}-${day}`;
                    
                    if (formattedDate == element.date) {
                        if (formattedDate == currDate) {
                            cell.style.border = '3px solid black';
                        }
                        var studyTime = element.hours;
                        cell.style.backgroundColor = getBackgroundColor(studyTime);
                        if (studyTime >= 3){
                            cell.style.color = "white";
                        }
                    }
                });
            });
        },
        error: function(xhr, status, error) {
            console.error("Error loading study time:", error);
        }
    });

    // 오늘 날짜 가져오기
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');

    // 각 셀을 순회하며 오늘 날짜와 일치하는 셀에 테두리 추가
    cells.forEach(function(cell) {
        if (cell.textContent == day) {
            // console.log(day);
            cell.style.border = '3px solid black';
        }
    });
}

function updateCalendarColor_Text(studyHours) {
    var currentDate = new Date();
    var cells = document.querySelectorAll('td');
    
    cells.forEach(function(cell) {
        let formattedMonth = String(currentDate.getMonth()+1).padStart(2, '0');
        let formattedDay = String(cell.textContent).padStart(2, '0');
        //반복문으로 형성된 날짜
        let formattedDate = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;

        let curDate = new Date();
        let year = curDate.getFullYear();
        let month = String(curDate.getMonth() + 1).padStart(2, '0');
        let day = String(curDate.getDate()).padStart(2, '0');
        //오늘 날짜
        let currDate = `${year}-${month}-${day}`;
        
        if (formattedDate == currDate) {
            cell.style.border = '3px solid black';
            console.log("go");
            cell.style.backgroundColor = getBackgroundColor(studyHours);
            if (studyHours >= 3) {
                cell.style.color = "white";
            } else {
                cell.style.color = "black";
            }
        }
        console.log("change");
    });
}
