// 로그인 버튼
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("manager-login");

  loginButton.addEventListener("click", function () {
    const destinationUrl = "/admin_order"; // 이 부분을 이동하고 싶은 페이지의 URL로 변경하세요.

    window.location.href = destinationUrl;
  });
});
