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

    const editProfileButton = document.getElementById("editProfileButton");
    const withdrawButton = document.getElementById("withdrawButton");

    // 수정하기 버튼 클릭 시 알림 창 표시
    editProfileButton.addEventListener("click", function () {
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
