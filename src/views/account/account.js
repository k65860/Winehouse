// update.js

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const passwordMatchMessage = document.getElementById("passwordMatchMessage");

  function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // 비밀번호 확인 입력 후에만 일치 여부 확인 및 에러 메시지 표시
    if (confirmPassword !== "") {
      if (password !== confirmPassword) {
        passwordMatchMessage.style.display = "block";
      } else {
        passwordMatchMessage.style.display = "none";
      }
    }
  }

  passwordInput.addEventListener("input", checkPasswordMatch);
  confirmPasswordInput.addEventListener("input", checkPasswordMatch);

  const editLoginButton = document.getElementById("editLoginButton");  // Changed to editLoginButton
  const withdrawButton = document.getElementById("withdrawButton");

  // 수정하기 버튼 클릭 시 알림 창 표시
  editLoginButton.addEventListener("click", function () {
    alert("수정되었습니다.");
  });

  // 탈퇴하기 버튼 클릭 시 확인 창 표시
  withdrawButton.addEventListener("click", function () {
    const confirmWithdraw = confirm("정말 탈퇴하시겠습니까?");

    // 확인을 누를 경우 알림 창 표시 및 페이지 이동
    if (confirmWithdraw) {
      alert("탈퇴되었습니다.");
      window.location.href = "/";
    }
  });
});

// 나이 입력 값 검증 함수
function validateAge() {
  let ageInput = document.getElementById('ageInput');
  let ageErrorMessage = document.getElementById('ageErrorMessage');

  // 나이 입력값 정규식 확인 
  let agePattern = /^\d+$/;

  if (agePattern.test(ageInput.value)) {
    // 에러 메시지 숨김
    ageErrorMessage.style.display = 'none';
  } else {
    // 에러 메시지 표시
    ageErrorMessage.style.display = 'block';
  }
}

// 비밀번호 확인 함수
function validatePassword() {
  let passwordInput = document.getElementById('passwordInput');
  let confirmPasswordInput = document.getElementById('confirmPasswordInput');
  let passwordMatchMessage = document.getElementById('passwordMatchMessage');

  const passwordsMatch = passwordInput.value === confirmPasswordInput.value;

  if (confirmPasswordInput.value && !passwordsMatch) {
    // 불일치할 경우 에러 메시지 표시
    passwordMatchMessage.style.display = 'block';
  } else {
    // 일치하거나 값이 없을 경우 에러 메시지 숨김
    passwordMatchMessage.style.display = 'none';
  }
}

// 비밀번호 입력칸에 input 이벤트 리스너 추가
passwordInput.addEventListener('input', validatePassword);
// 비밀번호 확인 입력칸에 input 이벤트 리스너 추가
confirmPasswordInput.addEventListener('input', validatePassword);

// 비밀번호 일치 여부 초기 검증
validatePassword();
