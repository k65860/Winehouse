// 사용자 정보 불러오기 예시
async function fetchUserInfo(userId) {
    const apiUrl = `/user/${userId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const userInfo = await response.json();
            return userInfo;
        } else {
            console.error('Failed to fetch user info:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    if (isLoggedIn()) {
        // 로그인되어 있다면 사용자 정보를 불러와서 화면에 표시
        const userInfo = await fetchUserInfo("65dedab635e938940dc7a900");
        if (userInfo) {
            initializeUserInfo(userInfo);
        } else {
            console.error('Failed to fetch user info.');
        }
    } else {
        // 로그인되어 있지 않다면 로그인 페이지로 이동 또는 다른 처리 수행
        window.location.href = '/login'; // 예시: 로그인 페이지로 이동
    }
    // 사용자 정보 수정 버튼 클릭 시
    const editProfileButton = document.getElementById('editProfileButton');
    editProfileButton.addEventListener('click', () => {
        // 사용자 정보 수정 함수 호출
        editProfile(existingUserInfo);
    });

    // 사용자 탈퇴 버튼 클릭 시
    const withdrawButton = document.getElementById('withdrawButton');
    withdrawButton.addEventListener('click', () => {
        // 사용자 탈퇴 함수 호출
        withdraw(existingUserInfo);
        window.location.href('/');
    });

    // 비밀번호 일치 여부 초기 검증
    validatePassword();
});

// 화면 초기화 예시
function initializeUserInfo(userInfo) {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneNumberInput = document.querySelector('input[placeholder="전화번호를 \'-\'포함 하여 입력해주세요"]');
    const ageInput = document.getElementById('ageInput');

    nameInput.value = userInfo.name;
    emailInput.value = userInfo.email;
    phoneNumberInput.value = userInfo.tel;
    ageInput.value = userInfo.age;

}

// 사용자 정보 수정 함수
async function editProfile(existingUserInfo) {
    async function editProfile(existingUserInfo) {
        const userId = "65dedab635e938940dc7a900"; // 임시 userId임 
        const apiUrl = `/user/${userId}`;

        const passwordInput = document.getElementById('passwordInput');
        const confirmPasswordInput = document.getElementById('confirmPasswordInput');
        const nameInput = document.getElementById('nameInput');
        const emailInput = document.getElementById('emailInput');
        const phoneNumberInput = document.querySelector('input[placeholder="전화번호를 \'-\'포함 하여 입력해주세요"]');
        const ageInput = document.getElementById('ageInput');

        const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
        const isValidName = /^[가-힣]+$/.test(nameInput.value);
        const isValidEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i.test(emailInput.value);
        const isValidPhoneNumber = /^01[0-9]-\d{4}-\d{4}$/.test(phoneNumberInput.value);
        const isNumericAge = /^\d+$/.test(ageInput.value);
        const isNumericPassword = /^\d+$/.test(passwordInput.value);
        const passwordMismatch = passwordInput.value === confirmPasswordInput.value;

        if (!passwordsMatch || !passwordMismatch) {
            alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            return;
        } else if (!isValidName) {
            alert("이름을 입력해주세요.");
            return;
        } else if (!isValidEmail) {
            alert("이메일 주소를 입력해주세요.");
            return;
        } else if (!isValidPhoneNumber) {
            alert("올바른 전화번호 형식을 입력해주세요.");
            return;
        } else if (!isNumericAge) {
            alert("나이는 숫자로만 입력해주세요.");
            return;
        } else if (!isNumericPassword) {
            alert("비밀번호는 숫자로만 입력해주세요.");
            return;
        }

        // 작성한 정보 중에서 기존 정보와 다른 것만 추출
        const updatedData = {};
        const userInfo = {
            name: document.getElementById('nameInput').value,
            email: document.getElementById('emailInput').value,
            password: document.getElementById('passwordInput').value,
            address: '', // 이부분은 필요에 따라 추가
            age: document.getElementById('ageInput').value,
            phoneNumber: document.getElementById('phoneNumberInput').value
        };

        for (const key in userInfo) {
            if (userInfo[key] !== existingUserInfo[key]) {
                updatedData[key] = userInfo[key];
            }
        }

        // 만약 updatedData가 비어있다면, 수정할 내용이 없다는 메시지를 표시하고 종료
        if (Object.keys(updatedData).length === 0) {
            alert("수정할 내용이 없습니다.");
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert("수정이 완료되었습니다.");
            } else {
                alert("수정에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("서버와의 통신 중 오류가 발생했습니다.");
        }
    }
}

// 사용자 탈퇴 함수
async function withdraw(existingUserInfo) {
    const confirmWithdraw = confirm('정말로 탈퇴하시겠습니까?');
    if (confirmWithdraw) {
        const apiUrl = `/user/${existingUserInfo._id}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert("탈퇴가 완료되었습니다.");
            } else {
                alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("서버와의 통신 중 오류가 발생했습니다.");
        }
    }
}
// 로그인 여부 확인 함수
function isLoggedIn() {
    // 여기에 로그인 여부를 확인하는 코드를 작성 (예: 토큰 검증)
    // 반환값이 true면 로그인된 상태, false면 로그인 안된 상태
    // 예시: 토큰을 사용하는 경우
    return sessionStorage.getItem('token') !== null;
}

