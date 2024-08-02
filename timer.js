let minutes = 25;
let seconds = 0;
let intervalId;
let totalSeconds;
let elapsedSeconds = 0;

function setTimer() {
    minutes = parseInt(document.getElementById('minutes-input').value, 10);
    seconds = 0;
    totalSeconds = minutes * 60 + seconds;
    elapsedSeconds = 0;
    updateTimerDisplay();
    updateProgress();
}

// 알람 소리를 재생하는 함수
function playAlarmSound() {
    var alarmSound = document.getElementById("alarm-sound");
    alarmSound.play();
}

// 타이머 시작하는 함수
function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            playAlarmSound(); // 타이머 종료 후 알람 소리 재생
            showEndMessage(); // 타이머 종료 시 사용자 정의 창 열기
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        elapsedSeconds++;
        updateTimerDisplay();
        updateProgress();
    }, 1000);
}

function pauseTimer() {
    clearInterval(intervalId);
}

function resetTimer() {
    clearInterval(intervalId);
    setTimer();
}

function updateTimerDisplay() {
    const timerDisplay = document.querySelector('.inside-circle');
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const progressElement = document.getElementById('progress');
    const percentage = (elapsedSeconds / totalSeconds) * 100;
    progressElement.style.background = `conic-gradient(red ${100 - percentage}%, white ${100 - percentage}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    totalSeconds = minutes * 60 + seconds;
    updateTimerDisplay();
    updateProgress();
});

let audioPlayers = {}; // 오디오 플레이어들을 관리하기 위한 객체

// 음악을 재생하는 함수
function playMusic(selectedMusic) {
    let musicSource = ""; // 음악 파일의 URL을 저장할 변수입니다.
    
    // 선택된 음악에 따라 음악 파일의 URL을 설정합니다.
    if (selectedMusic === "music1") {
        musicSource = "music1.mp3"; // 음악1의 파일 경로 또는 URL
    } else if (selectedMusic === "music2") {
        musicSource = "music2.mp3"; // 음악2의 파일 경로 또는 URL
    } else if (selectedMusic === "music3") {
        musicSource = "music3.mp3"; // 음악3의 파일 경로 또는 URL
    }
    
    // 만약 선택된 음악에 대한 오디오 플레이어가 이미 생성되었다면 재생합니다.
    if (audioPlayers[selectedMusic]) {
        audioPlayers[selectedMusic].play();
        // 현재 재생 중인 음악의 CD 이미지에 회전 애니메이션을 추가합니다.
        let currentMusicImage = document.getElementById(selectedMusic);
        if (currentMusicImage) {
            currentMusicImage.style.animation = 'spin 10s linear infinite'; // 회전 애니메이션을 추가합니다.
        }
    } else {
        // 새로운 오디오 요소를 생성하고 음악을 재생합니다.
        let audioPlayer = new Audio(musicSource);
        audioPlayer.play();
        // 생성된 오디오 플레이어를 객체에 저장합니다.
        audioPlayers[selectedMusic] = audioPlayer;
        // 현재 재생 중인 음악의 CD 이미지에 회전 애니메이션을 추가합니다.
        let currentMusicImage = document.getElementById(selectedMusic);
        if (currentMusicImage) {
            currentMusicImage.style.animation = 'spin 10s linear infinite';
        }
    }
}

// 음악을 정지하는 함수
function pauseMusic(selectedMusic) {
    // 선택된 음악에 대한 오디오 플레이어가 존재하면 정지합니다.
    if (audioPlayers[selectedMusic]) {
        audioPlayers[selectedMusic].pause();
        // 정지된 음악의 CD 이미지의 회전 애니메이션을 제거합니다.
        let currentMusicImage = document.getElementById(selectedMusic);
        if (currentMusicImage) {
            currentMusicImage.style.animation = '';
        }
        // 재생 중인 음악 버튼의 스타일을 초기화합니다.
        let playButton = document.querySelector(`.play-button[data-music="${selectedMusic}"]`);
        if (playButton) {
            playButton.classList.remove('playing');
        }
    }
}

// 사용자 정의 창 열기
function openCustomAlert() {
    var customAlert = document.getElementById("custom-alert");
    customAlert.style.display = "block";
  }
  
// 사용자 정의 창 닫기
function closeCustomAlert() {
    var customAlert = document.getElementById("custom-alert");
    customAlert.style.display = "none";
    pauseAlarmSound(); // 알람 소리 중지
}

// 알람 소리를 일시 중지하는 함수
function pauseAlarmSound() {
    var alarmSound = document.getElementById("alarm-sound");
    alarmSound.pause();
}
  
// 뽀모도로 종료 시 사용자 정의 창 열기
function showEndMessage() {
openCustomAlert();
}
  