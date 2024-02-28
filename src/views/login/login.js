document.addEventListener('DOMContentLoaded', function () {
  // 이메일을 정규식을 사용하여 유효성 검사하는 함수
  function validateEmail(email) {
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i;
    return emailRegex.test(email);
  }

  // 폼 제출을 처리하는 함수
  function handleFormSubmission(event) {
    event.preventDefault();

    // 이메일 입력 값 가져오기
    const emailInput = document.querySelector('.input[type="email"]');
    const email = emailInput.value.trim();

    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      // 유효하지 않은 이메일 오류 메시지
      alert('유효한 이메일 주소를 입력해주세요.');
      return;
    }


    window.location.href = '/';

    // 데모 목적으로 성공 메시지를 알림창으로 표시
    alert('로그인 되셨습니다.');
  }

  // 폼 제출에 대한 이벤트 리스너 추가
  const loginForm = document.querySelector('.box');
  loginForm.addEventListener('submit', handleFormSubmission);
});
