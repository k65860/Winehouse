document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const phoneNumberInput = document.getElementById("phoneNumberInput");

  const passwordMatchMessage = document.getElementById("passwordMatchMessage");
  const nameErrorMessage = document.getElementById("nameErrorMessage");
  const emailErrorMessage = document.getElementById("emailErrorMessage");
  const phoneNumberErrorMessage = document.getElementById("phoneNumberErrorMessage");

  confirmPasswordInput.addEventListener("input", function () {
    // 비밀번호 확인과 비밀번호가 일치하지 않으면 메시지를 표시
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
    passwordMatchMessage.style.display = passwordsMatch ? "none" : "block";
  });

  nameInput.addEventListener("input", function () {
    // 이름이 한글인지 확인
    const nameRegex = /^[가-힣]+$/;
    nameErrorMessage.style.display = nameRegex.test(nameInput.value) ? "none" : "block";
  });

  emailInput.addEventListener("input", function () {
    // 이메일 정규식을 사용하여 유효성 검사
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
    emailErrorMessage.style.display = emailRegex.test(emailInput.value) ? "none" : "block";
  });

  phoneNumberInput.addEventListener("input", function () {
    // 전화번호가 숫자인지 확인
    const phoneNumberRegex = /^\d+$/;
    phoneNumberErrorMessage.style.display = phoneNumberRegex.test(phoneNumberInput.value) ? "none" : "block";
  });

  // 회원가입 버튼 클릭 시 확인
  const signUpButton = document.getElementById("editLoginButton");
  signUpButton.addEventListener("click", function () {
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
    const isValidName = /^[가-힣]+$/.test(nameInput.value);
    const isValidEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i.test(emailInput.value);
    const isValidPhoneNumber = /^\d+$/.test(phoneNumberInput.value);

    if (!passwordsMatch) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    } else if (!isValidName) {
      alert("이름을 입력해주세요.");
    } else if (!isValidEmail) {
      alert("이메일 주소를 입력해주세요.");
    } else if (!isValidPhoneNumber) {
      alert("전화번호를 입력해주세요.");
    } else {
      // 여기에 회원가입 처리 로직을 추가
      alert("회원가입이 완료되었습니다!");
      window.location.href = "/login";
    }
  });
});
