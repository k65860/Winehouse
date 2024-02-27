// JavaScript 코드
document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const passwordMatchMessage = document.getElementById("passwordMatchMessage");

  confirmPasswordInput.addEventListener("input", function () {
    // 비밀번호 확인과 비밀번호가 일치하지 않으면 메시지를 표시
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
    passwordMatchMessage.style.display = passwordsMatch ? "none" : "block";
  });

  // 회원가입 버튼 클릭 시 확인
  const signUpButton = document.getElementById("editLoginButton");
  signUpButton.addEventListener("click", function () {
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
    if (!passwordsMatch) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    } else {
      // 여기에 회원가입 처리 로직을 추가
      alert("회원가입이 완료되었습니다!");
      window.location.href = "/login";
    }
  });
});
