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

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const emotionButtons = document.querySelectorAll('.emotion-button');
    const weatherButtons = document.querySelectorAll('.weather-button');

    feedbackForm.addEventListener('submit', submitFeedback);
    weatherButtons.forEach(button => {
        button.addEventListener('click', selectWeather);
    });
    emotionButtons.forEach(button => {
        button.addEventListener('click', selectEmotion);
    });

    loadFeedbacks();
});

let feedbackCounter = 0; // 피드백 아이템에 고유한 인덱스를 부여하기 위한 카운터

//complete
function submitFeedback(event) {
    event.preventDefault(); // 기본 제출 이벤트 방지

    // 현재 날짜 가져오기
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // 입력 값 가져오기
    const date = document.getElementById('date').value;

    // 입력한 날짜가 오늘보다 이후인지 확인
    if (date > todayStr) {
        alert('미래의 일기는 작성할 수 없습니다.');
        return;
    }

    // 입력한 날짜가 오늘 이전인 경우에만 피드백 추가
    const feedbackContent = document.getElementById('feedback').value;
    const emotion = document.getElementById('emotion').value;
    const weather = document.getElementById('weather').value;

    // 감정 또는 날씨를 선택하지 않았을 때 제출 불가
    if (!emotion || !weather) {
        alert('감정과 날씨를 선택해주세요.');
        return;
    }

    // 이미 오늘의 일기가 있는지 확인
    if (isFeedbackExist(date)) {
        alert('하루에 한 개의 일기만 작성할 수 없습니다.');
        return;
    }

    // 피드백 추가
    addFeedback(date, feedbackContent, emotion, weather);

    // 폼 초기화
    document.getElementById('feedback-form').reset();
    clearEmotionSelection();
    clearWeatherSelection();
}
//complete
function loadFeedbacks() {
    console.log("Loading feedbacks...");
    $.ajax({
        type: "GET",
        url: "get_diary.php",
        success: function(response) {
            var decodedData = JSON.parse(response);
            i = 0;
            index = -1;
            decodedData.forEach(function(user) {
                if (user_id == user.id){
                    index = i;
                }
                i++;
            });
            user = decodedData;

            console.log(index);

            if (index >= 0 && user_id == decodedData[index]['id']) {
                user = decodedData.filter(function(item) {
                    return item.id === user_id;
                });
                console.log(user);
                user.forEach(function(ind) {
                    console.log(ind);
                });
            } else {
                user = null;
            }

            console.log(user);
            displayFeedbacks(user);
        },
        error: function(xhr, status, error) {
            console.error("Error loading feedbacks:", error);
        }
    });

    const today = new Date().toISOString().slice(0, 10);
    document.getElementById('date').value = today;
}
//complete
function displayFeedbacks(feedbacks) {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';

    if (index >= 0 && feedbacks != null) {
        // 날짜를 기준으로 내림차순 정렬
        feedbacks.sort((a, b) => new Date(b.date) - new Date(a.date));

        feedbacks.forEach(feedback => {
            const feedbackItem = document.createElement('li');
            feedbackItem.classList.add('feedback-item');
            feedbackItem.dataset.index = feedbackCounter++;
            feedbackItem.innerHTML = `
                <span class="feedback-date">${feedback.date}</span>
                <span class="feedback-weather">${getWeatherEmoticon(feedback.weather)}</span>
                <span class="feedback-emotion">${getEmotionEmoticon(feedback.emotion)}</span>
                <p class="feedback-content">${feedback.content}</p>
                <button class="edit-feedback" onclick="openEditForm(${feedbackItem.dataset.index})">편집</button>
                <button class="delete-feedback" onclick="deleteDiary(${feedbackItem.dataset.index})">삭제</button>
            `;
            feedbackList.appendChild(feedbackItem);
        });
    }
}

//complete
function addFeedback(date, content, emotion, weather) {
    var data = {
        user_id: user_id,
        date: date,
        weather: getWeatherText(weather),
        feedback: content,
        emotion: getEmotionText(emotion)
    };

    console.log(data);

    $.ajax({
        type: "POST",
        url: "save_diary.php",
        data: JSON.stringify(data), // 변수를 JSON 문자열로 변환하여 전송합니다.
        contentType: "application/json",
        success: function(response) {
            console.log("Received data from server:", response);
            loadFeedbacks();
        },
        error: function(xhr, status, error) {
            console.error("Error saving data:", error);
        }
    });
}

function getWeatherText(weather) {
    switch (weather) {
        case '☀️':
            return '맑음';
        case '☁️':
            return '구름많음';
        case '🌧️':
            return '비';
        case '🌥️':
            return '흐림';
        case '❄️':
            return '눈';
        default:
            return '';
    }
}

function getEmotionText(emotion) {
    switch (emotion) {
        case '😊':
            return '매우좋음';
        case '🙂':
            return '좋음';
        case '😐':
            return '보통';
        case '😕':
            return '나쁨';
        case '😔':
            return '매우나쁨';
        default:
            return '';
    }
}

function getWeatherEmoticon(text) {
    switch (text) {
        case '맑음':
            return '☀️';
        case '구름많음':
            return '☁️';
        case '비':
            return '🌧️';
        case '흐림':
            return '🌥️';
        case '눈':
            return '❄️';
        default:
            return '';
    }
}

function getEmotionEmoticon(text) {
    switch (text) {
        case '매우좋음':
            return '😊';
        case '좋음':
            return '🙂';
        case '보통':
            return '😐';
        case '나쁨':
            return '😕';
        case '매우나쁨':
            return '😔';
        default:
            return '';
    }
}

function openEditForm(index) {
    const feedbackItem = document.querySelector(`.feedback-item[data-index='${index}']`);
    const date = feedbackItem.querySelector('.feedback-date').textContent;
    const content = feedbackItem.querySelector('.feedback-content').textContent;
    const emotion = feedbackItem.querySelector('.feedback-emotion').textContent;
    const weather = feedbackItem.querySelector('.feedback-weather').textContent;

    // 모달 컨테이너 생성
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.innerHTML = `
        <div class="modal">
            <h1>한 줄 일기 편집</h1>
            <form id="edit-form">
                <label for="edit-date">날짜</label>
                <input type="date" id="edit-date" name="date" value="${date}" required>

                <label for="date">날씨</label>
                <div class="weather-buttons">
                    <div class="weather-button ${weather === '☀️' ? 'selected' : ''}" data-weather="☀️">맑음☀️</div>
                    <div class="weather-button ${weather === '🌥️' ? 'selected' : ''}" data-weather="🌥️">흐림🌥️</div>
                    <div class="weather-button ${weather === '🌧️' ? 'selected' : ''}" data-weather="🌧️">비🌧️</div>
                    <div class="weather-button ${weather === '☁️' ? 'selected' : ''}" data-weather="☁️">구름많음☁️</div>
                    <div class="weather-button ${weather === '❄️' ? 'selected' : ''}" data-weather="❄️">눈❄️</div>
                </div>

                <label for="edit-feedback">오늘의 일기</label>
                <textarea id="edit-feedback" name="feedback" rows="4" required>${content}</textarea>

                <div class="emotion-buttons">
                    <div class="emotion-button ${emotion === '😊' ? 'selected' : ''}" data-emotion="😊">매우좋음😊</div>
                    <div class="emotion-button ${emotion === '🙂' ? 'selected' : ''}" data-emotion="🙂">좋음🙂</div>
                    <div class="emotion-button ${emotion === '😐' ? 'selected' : ''}" data-emotion="😐">보통😐</div>
                    <div class="emotion-button ${emotion === '😕' ? 'selected' : ''}" data-emotion="😕">나쁨😕</div>
                    <div class="emotion-button ${emotion === '😔' ? 'selected' : ''}" data-emotion="😔">매우나쁨😔</div>
                </div>
                <input type="hidden" id="edit-emotion" name="emotion" value="${emotion}" required>
                <input type="hidden" id="edit-weather" name="weather" value="${weather}" required>

                <button type="button" onclick="submitEdit(${index})">편집 완료</button>
                <button type="button" class="close-btn" onclick="closeEditForm()">x</button>
            </form>
        </div>
    `;

    // 모달 컨테이너를 body에 추가
    document.body.appendChild(modalContainer);

    // 감정 버튼 클릭 이벤트 추가
    const modalEmotionButtons = document.querySelectorAll('.modal .emotion-button');
    modalEmotionButtons.forEach(button => {
        button.addEventListener('click', selectModalEmotion);
    });

    // 날씨 버튼 클릭 이벤트 추가
    const modalWeatherButtons = document.querySelectorAll('.modal .weather-button');
    modalWeatherButtons.forEach(button => {
        button.addEventListener('click', selectModalWeather);
    });
}

function deleteDiary(index) {
    const feedbackItem = document.querySelector(`.feedback-item[data-index='${index}']`);
    const Deletedate = feedbackItem.querySelector('.feedback-date').textContent;

    $.ajax({
        type: "POST",
        url: "diary_delete.php",
        data: { id: Deletedate }, // 'date' 대신 'id' 사용
        success: function(response) {
            console.log("Diary entry deleted successfully:", response);
            // Optionally, remove the deleted entry from the DOM
            feedbackItem.remove();
        },
        error: function(xhr, status, error) {
            console.error("Error deleting diary entry:", error);
        }
    });
}


function closeEditForm() {
    // 모달 컨테이너를 body에서 제거
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.remove();
    }
    loadFeedbacks();
}

function submitEdit(index) {
    // 수정된 내용 가져오기
    const date = document.getElementById('edit-date').value;
    const content = document.getElementById('edit-feedback').value;
    const emotion = document.getElementById('edit-emotion').value;
    const weather = document.getElementById('edit-weather').value;

    // 수정된 데이터를 서버로 전송
    var data = {
        date: date,
        weather: getWeatherText(weather),
        feedback: content,
        emotion: getEmotionText(emotion)
    };

    console.log(data);

    $.ajax({
        type: "POST",
        url: "diary_update.php",
        data: JSON.stringify(data), // 변수를 JSON 문자열로 변환하여 전송합니다.
        contentType: "application/json",
        success: function(response) {
            console.log("Received data from server:", response);
        },
        error: function(xhr, status, error) {
            console.error("Error saving data:", error);
        }
    });

    // 기존 피드백 아이템 업데이트
    // const feedbackItem = document.querySelector(`.feedback-item[data-index='${index}']`);
    // feedbackItem.querySelector('.feedback-date').textContent = date;
    // feedbackItem.querySelector('.feedback-content').textContent = content;
    // feedbackItem.querySelector('.feedback-emotion').textContent = emotion;
    // feedbackItem.querySelector('.feedback-weather').textContent = weather;

    closeEditForm();
}

function isFeedbackExist(date) {
    const feedbackItems = document.querySelectorAll('.feedback-item .feedback-date');
    return Array.from(feedbackItems).some(item => item.textContent === date);
}

function selectEmotion(event) {
    const selectedButton = event.currentTarget;
    const emotionButtons = document.querySelectorAll('.emotion-button');
    emotionButtons.forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    document.getElementById('emotion').value = selectedButton.dataset.emotion;
}

function selectWeather(event) {
    const selectedButton = event.currentTarget;
    const weatherButtons = document.querySelectorAll('.weather-button');
    weatherButtons.forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    document.getElementById('weather').value = selectedButton.dataset.weather;
}

function clearEmotionSelection() {
    const emotionButtons = document.querySelectorAll('.emotion-button');
    emotionButtons.forEach(button => button.classList.remove('selected'));
    document.getElementById('emotion').value = '';
}

function clearWeatherSelection() {
    const weatherButtons = document.querySelectorAll('.weather-button');
    weatherButtons.forEach(button => button.classList.remove('selected'));
    document.getElementById('weather').value = '';
}

function selectModalEmotion(event) {
    const selectedButton = event.currentTarget;
    const modalEmotionButtons = document.querySelectorAll('.modal .emotion-button');
    modalEmotionButtons.forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    document.getElementById('edit-emotion').value = selectedButton.dataset.emotion;
}

function selectModalWeather(event) {
    const selectedButton = event.currentTarget;
    const modalWeatherButtons = document.querySelectorAll('.modal .weather-button');
    modalWeatherButtons.forEach(button => button.classList.remove('selected'));
    selectedButton.classList.add('selected');
    document.getElementById('edit-weather').value = selectedButton.dataset.weather;
}



