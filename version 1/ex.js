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

const calendar = document.getElementById('calendar');
const calendarMonthElem = document.getElementById('calendar-month');
const selectedDateElem = document.getElementById('selected-date');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedDate = null;
let tmp_selectedDate = null;
let selectedButton = null;
let str_selectedDate = null;

const todos = {};

const modal = document.getElementById('myModal');

// 모달 열기 함수
function openModal() {
    modal.style.display = 'block'; // 모달 창 보이기
    document.body.style.overflow = 'hidden'; // 바깥 영역 스크롤 방지
    document.getElementById('yearInput').value = currentYear; // 현재 년도 표시
    document.getElementById('monthInput').value = currentMonth + 1; // 현재 월 표시
}

// 모달 닫기 함수
function closeModal() {
    modal.style.display = 'none'; // 모달 창 숨기기
    document.body.style.overflow = 'auto'; // 바깥 영역 스크롤 허용
}

// 달력 변경 함수
function changeMonth() {
    const yearInput = document.getElementById('yearInput').value;
    const monthInput = document.getElementById('monthInput').value;

    // 입력된 값으로 달력 업데이트
    if (yearInput && monthInput) {
        // 여기서 입력된 년도와 월을 이용하여 달력을 변경하는 작업을 수행합니다.
        console.log('변경된 년도:', yearInput);
        console.log('변경된 월:', monthInput);
        closeModal(); // 모달 창 닫기
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
});

function generateCalendar() {
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    
    calendarMonthElem.textContent = `${currentYear}년 ${monthNames[currentMonth]}`;

    checkTodo();
    closeModal();
}

function selectDate(year, month, day) {
    // 새로운 선택한 버튼 스타일 변경
    selectedDate = `${year} / ${month + 1} / ${day}`;
    selectedDateElem.textContent = `To Do List - ${selectedDate}`;

    if (ready == true){
        tmp_selectedDate = new Date(year, month, day + 1).toISOString().slice(0,10);
        ready = false;
    }
    else{
        tmp_selectedDate = new Date(year, month, day + 1).toISOString().slice(0,10);
        selectedButton = event.target;
    }

    loadTodos(); // 선택한 날짜에 해당하는 Todo 목록 로드
}

function checkTodo() {
    $.ajax({
        type: "GET",
        url: "ex_get.php", // PHP 파일의 경로를 입력합니다.
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = -1;
            
            user_todos = [];
            decodedData.forEach(function(todo) {
                if (user_id == todo.user_id){
                    user_todos.push(todo);
                    i++;
                }
            });
            console.log(user_todos);
            
            if (i >= 0) {
                $todos = user_todos;

                const dayTodos = $todos;

                index = 0;
                let includedDates = {}; // 포함된 날짜를 추적하기 위한 객체
                let todosCountByDate = {}; // 날짜별 할 일 개수를 추적하기 위한 객체
                let completedCountByDate = {}; // 날짜별로 completed가 true인 개수를 추적하기 위한 객체
                
                // dayTodos 배열에 있는 날짜들을 includedDates에 추가하고 해당 날짜의 할 일 개수를 카운트합니다.
                dayTodos.forEach(todo => {
                    const date = todo.date;
                    if (!includedDates[date]) {
                        includedDates[date] = true; // 해당 날짜가 포함된 경우 true로 표시
                        todosCountByDate[date] = 0; // 해당 날짜의 할 일 개수 초기화
                        completedCountByDate[date] = 0; // 해당 날짜의 completed가 true인 개수 초기화
                    }
                    todosCountByDate[date]++; // 해당 날짜의 할 일 개수 증가
                    if (todo.completed === '1') {
                        completedCountByDate[date]++; // completed가 true인 경우 개수 증가
                    }
                });
                
                // 모든 할 일을 완료한 날짜와 완료하지 못한 날짜를 분리합니다.
                let allCompletedDates = [];
                let incompleteDates = [];
                for (const date in todosCountByDate) {
                    if (todosCountByDate[date] === completedCountByDate[date]) {
                        allCompletedDates.push(date); // 모든 할 일을 완료한 경우
                    } else {
                        incompleteDates.push(date); // 완료하지 못한 경우
                    }
                }

                console.log(allCompletedDates);
                console.log(incompleteDates);
                
                const firstDay = new Date(currentYear, currentMonth, 1);
                const startDay = firstDay.getDay();
                const lastDay = new Date(currentYear, currentMonth + 1, 0);
                calendar.innerHTML = '';

                // 매달 앞에 빈칸들
                for (let i = 0; i < startDay; i++) {
                    const emptyCell = document.createElement('div');
                    calendar.appendChild(emptyCell);
                }

                // 날짜 버튼에 대한 색상을 설정합니다.
                for (let i = 1; i <= lastDay.getDate(); i++) {
                    const dayContainer = document.createElement('div');
                    dayContainer.classList.add('calendar-day');
                    const dayButton = document.createElement('button');
                    
                    // 현재 날짜인 경우 클래스 추가
                    const currentDate = new Date();
                    if (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i === currentDate.getDate()) {
                        dayButton.style.borderWidth = "2px"; // 경계선 굵기 변경
                        dayButton.style.borderStyle = "solid"; // 경계선 스타일 변경
                        dayButton.style.borderColor = "black"; // 경계선 색상 변경
                        dayButton.style.backgroundColor = "black";
                        selectedButton = dayButton; 

                        // 새로운 선택한 버튼 스타일 변경
                        selectedDateElem.textContent = `To Do List - ${`${currentYear} / ${currentMonth + 1} / ${i}`}`;
                        
                        loadTodos();
                    }
                    else{
                        selectedDateElem.textContent = `To Do List - ${selectedDate}`;
                    }

                    const date = new Date(currentYear, currentMonth, i + 1).toISOString().slice(0, 10);
                    if (allCompletedDates.includes(date)) {
                        console.log("in", date);    
                        if (dayButton) {
                            console.log("in", dayButton);
                            dayButton.style.backgroundColor = "green"; // 모든 할 일을 완료한 경우
                        }
                    } else if (incompleteDates.includes(date)) {
                        console.log("inc", date);
                        if (dayButton) {
                            console.log("in", dayButton);
                            dayButton.style.backgroundColor = "red"; // 완료하지 못한 경우
                        }
                    }

                    dayButton.onclick = () => selectDate(currentYear, currentMonth, i);

                    // 일자를 표시할 요소 생성
                    const dayText = document.createElement('div');
                    dayText.textContent = i;
                    dayContainer.appendChild(dayButton);
                    dayContainer.appendChild(dayText);
                    calendar.appendChild(dayContainer);
                }

                // 초기화면에서 모달 숨기기
                closeModal();
            } else {
                $todos = null;
            }
            // displayTodos();
        },
        error: function(xhr, status, error) {
            console.error("Error loading todos:", error);
        }
    });
}

let ready = false;

// 페이지가 로드될 때 Todo 목록을 불러옵니다.
$(document).ready(function() {
    console.log("ready");
    
    today = new Date();
    todayYear = today.getFullYear();
    todayMonth = today.getMonth();
    todayDay = today.getDate();
    ready = true;
    console.log(today);

    selectDate(todayYear, todayMonth, todayDay);
    generateCalendar();
    loadTodos();
});

function displayTodos() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = ''; // 기존 목록 제거

    console.log("display", $todos);

    // 선택된 날짜에 해당하는 할 일이 있는지 확인
    if ($todos != null) {
        $todos.forEach((todo) => {
            console.log(tmp_selectedDate);
            if (todo.date == tmp_selectedDate){
                const todoItem = document.createElement('li');
                todoItem.className = 'todo-item';

                // 체크박스 생성
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'todo-checkbox';
                checkbox.checked = todo.completed === '1'; // 문자열 '1'과 비교
                console.log("displayTodos -> toggleCompletion");
                checkbox.addEventListener('change', () => toggleTodoCompletion(todo));

                // 수정 버튼 생성
                const editButton = document.createElement('button');
                editButton.textContent = '수정';
                editButton.className = 'edit-button';
                editButton.addEventListener('click', () => {
                    // 수정 버튼을 클릭하면 텍스트를 감추고 입력 상자를 나타내도록 함
                    span.style.display = 'none'; // 텍스트 감춤
                    input.style.display = 'inline'; // 입력 상자 표시
                    input.value = span.textContent; // 입력 상자에 텍스트 설정
                    input.focus(); // 입력 상자에 포커스 설정
                    editButton.style.display = 'none'; // 수정 버튼 감춤
                    saveButton.style.display = 'inline'; // 저장 버튼 표시
                    deleteButton.style.display = 'none'; // 삭제 버튼 감춤
                });

                // 저장 버튼 생성
                const saveButton = document.createElement('button');
                saveButton.textContent = '저장';
                saveButton.className = 'save-button';
                saveButton.style.display = 'none'; // 저장 버튼 초기에는 감춤
                
                saveButton.addEventListener('click', () => {
                    // 저장 버튼을 클릭하면 입력 상자의 내용을 텍스트에 반영하고, 수정 상태 종료
                    span.textContent = input.value;
                    todo.todo_text = span.textContent; // 수정된 텍스트를 저장

                    console.log(todo);
                    // // 수정된 데이터를 서버로 전송
                    var data = {
                        id: todo.id,
                        todo_text: todo.todo_text
                    };

                    $.ajax({
                        type: "POST",
                        url: "ex_update.php",
                        data: JSON.stringify(data), // 변수를 JSON 문자열로 변환하여 전송합니다.
                        contentType: "application/json",
                        success: function(response) {
                            console.log("Received data from server:", response);
                        },
                        error: function(xhr, status, error) {
                            console.error("Error saving data:", error);
                        }
                    });

                    span.style.display = 'inline'; // 텍스트 표시
                    input.style.display = 'none'; // 입력 상자 감춤
                    editButton.style.display = 'inline'; // 수정 버튼 표시
                    saveButton.style.display = 'none'; // 저장 버튼 감춤
                    deleteButton.style.display = 'inline'; // 삭제 버튼 표시
                });

                // 삭제 버튼 생성
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '삭제';
                deleteButton.className = 'delete-button';
                console.log("displayTodos -> deleteTodo");
                deleteButton.addEventListener('click', () => deleteTodo(todo));

                // 텍스트 표시용 span 요소 생성
                const span = document.createElement('span');
                span.textContent = todo.todo_text;
                span.className = todo.completed === '1' ? 'completed' : ''; // 완료된 할 일에 대한 스타일 적용

                // 수정할 수 있는 입력 상자 생성
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'edit-input';
                input.style.display = 'none'; // 입력 상자 초기에는 감춤
                input.addEventListener('blur', () => {
                    // 입력 상자를 수정하고 포커스를 잃으면 저장 버튼을 클릭한 것으로 처리하여 수정 내용을 저장하도록 함
                    saveButton.click();
                });

                todoItem.appendChild(checkbox);
                todoItem.appendChild(input);
                todoItem.appendChild(saveButton);
                todoItem.appendChild(span);
                todoItem.appendChild(editButton);
                todoItem.appendChild(deleteButton);
                todoListElement.appendChild(todoItem);
            }
        });
    } 
    else {
        // 할 일이 없을 경우 메시지 출력
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = '할 일이 없습니다.';
        todoListElement.appendChild(emptyMessage);
    }
}

//complete
function addTodo() {
    console.log("addTodo");
    console.log(selectedDate);
    if (selectedDate && todoInput.value.trim()) {
        console.log("add", selectedDate, todoInput.value.trim());

        // 데이터 생성
        var data = {
            user_id: user_id,
            selectedDate: selectedDate,
            todoText: todoInput.value.trim(),
            completed: false
        };

        $.ajax({
            type: "POST",
            url: "ex_save.php",
            data: JSON.stringify(data), // 변수를 JSON 문자열로 변환하여 전송합니다.
            contentType: "application/json",
            success: function(response) {
                console.log("Received data from server:", response);
                
                generateCalendar();
                loadTodos(); // 일정 목록 갱신
                
                todoInput.value = ''; // 입력창 초기화
            },
            error: function(xhr, status, error) {
                console.error("Error saving data:", error);
            }
        });
    }
}

//complete
function loadTodos(selectedDate) {
    console.log("loadTodos");
    $.ajax({
        type: "GET",
        url: "ex_get.php", // PHP 파일의 경로를 입력합니다.
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = -1;
            
            user_todos = [];
            // if (user_id == decodedData)
            decodedData.forEach((todo) => {
                if (user_id == todo.user_id){
                    user_todos.push(todo);
                    i++;
                }
            });
            console.log(user_todos);
            
            if (i >= 0) {
                $todos = user_todos;
            } else {
                $todos = null;
            }
            console.log($todos);
            displayTodos();
        },
        error: function(xhr, status, error) {
            console.error("Error loading todos:", error);
        }
    });
}

//complete
function toggleTodoCompletion(todo) {
    $old = todo.completed;
    if ($old == true)
        todo.completed = 0;
    else
        todo.completed = 1;

    var data = {
        id: todo.id,
        completed: todo.completed
    };

    $.ajax({
        type: "POST",
        url: "ex_check.php",
        data: JSON.stringify(data), // 변수를 JSON 문자열로 변환하여 전송합니다.
        contentType: "application/json",
        success: function(response) {
            loadTodos();
            checkTodo();
        },
        error: function(xhr, status, error) {
            console.error("Error saving data:", error);
        }
    });
}

//complete
function deleteTodo(todo) {
    const idDelete = todo.id;

    // AJAX 요청을 통해 PHP 스크립트로 데이터 전송
    $.ajax({
        type: "POST",
        url: "ex_delete.php", // 삭제를 처리할 PHP 파일 경로
        data: { id: idDelete }, // 삭제할 일정의 날짜를 전송
        success: function(response) {
            // 성공적으로 처리된 후에는 화면 갱신 등의 작업을 수행할 수 있습니다.
            console.log("일정이 성공적으로 삭제되었습니다.");
            loadTodos(); // 일정 목록 갱신
            checkTodo();
        },
        error: function(xhr, status, error) {
            // 오류 발생 시 적절히 처리
            console.error("일정 삭제 중 오류 발생:", error);
        }
    });
}


document.getElementById('calendar-month').addEventListener('click', function() {
    openModal();
});

// 달력 변경 함수
function changeMonth() {
    const yearInput = document.getElementById('yearInput').value;
    const monthInput = document.getElementById('monthInput').value;

    // 입력된 값으로 달력 업데이트
    if (yearInput && monthInput) {
        currentYear = parseInt(yearInput);
        currentMonth = parseInt(monthInput) - 1;
        generateCalendar();
        closeModal(); // 모달 창 닫기
    }
}

generateCalendar();
