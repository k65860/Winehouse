function EditProfile() {
    alert("정보수정 되었습니다.");

  }

  function confirmWithdraw() {
    const confirmResult = confirm("정말 탈퇴하시겠습니까?");

    if (confirmResult) {
        // '예'를 선택한 경우
        alert("탈퇴 되었습니다.")
        window.location.href = "/"; 
    } else {
        // '아니요'를 선택한 경우
        alert("탈퇴가 취소되었습니다.");
    }
}
