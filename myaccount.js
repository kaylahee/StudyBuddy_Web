let user_id;

document.getElementById('profile-picture').addEventListener('change', function(event) {
    const imageUrl = event.target.value;
    if (imageUrl) {
        document.getElementById('profile-picture-preview').src = imageUrl;
    }
});


document.getElementById('show-password').addEventListener('change', function() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    if (this.checked) {
        password.type = 'text';
        confirmPassword.type = 'text';
    } else {
        password.type = 'password';
        confirmPassword.type = 'password';
    }
});

function get_userID() {
    $.ajax({
        type: "GET",
        url: "get_userID.php", // PHP 파일의 경로를 입력합니다.
        success: function(response) {
            user_id = response; // user_id에 값 할당
            loadAccount(); // get_userID() 함수 완료 후 loadAccount() 함수 호출
        },
        error: function(xhr, status, error) {
            console.error("Error loading account data:", error);
        }
    });
}

get_userID();

function loadAccount() {
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

            // 다른 데이터 필드 업데이트
            document.getElementById('profile-picture-preview').src = user[index].profile;
            document.getElementById('inform').value = user[index].inform;
            document.getElementById('username').value = user[index].user_name;
            document.getElementById('email').value = user[index].user_email;

            //console.log(user); // 성공적으로 로드된 데이터를 확인하기 위해 콘솔에 출력
        },
        error: function(xhr, status, error) {
            console.error("Error loading account data:", error);
        }
    });
}

function saveInform() {    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const profilePicture = document.getElementById('profile-picture').value;
    const inform = document.getElementById('inform').value;

    if (username && email) {
        if (password && password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        $.ajax({
            type: "GET",
            url: "get_account.php",
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
                var user = decodedData[index];

                const finalProfilePicture = profilePicture ? profilePicture : user.profile;
                const finalPassword = password ? password : user.password;

                var data = {
                    user_id: user_id,
                    inform: inform,
                    username: username,
                    email: email,
                    password: finalPassword,
                    profilePicture: finalProfilePicture
                };

                $.ajax({
                    type: "POST",
                    url: "save_account.php",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    success: function(response) {
                        console.log("Received data from server:", response);
                    },
                    error: function(xhr, status, error) {
                        console.error("Error saving data:", error);
                    }
                });

                alert('프로필이 수정되었습니다!');
            },
            error: function(xhr, status, error) {
                console.error("Error loading account data:", error);
            }
        });
    } else {
        alert('모든 필드를 채워주세요.');
    }
}

loadAccount();

