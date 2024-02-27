// 삭제 버튼
document.addEventListener("DOMContentLoaded", function () {
  const cancelButtons = document.querySelectorAll(".cancelBtn");

  // forEach를 사용하여 각 버튼에 클릭 이벤트를 추가합니다.
  cancelButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      // 사용자에게 확인 메시지를 표시합니다.
      const result = confirm("주문취소 하시겠습니까?");

      // 사용자가 '예'를 선택한 경우
      if (result) {
        // 클래스명이 'card'인 요소의 인덱스에 해당하는 요소를 삭제합니다.
        const box = document.querySelectorAll(".box");
        if (box.length > index) {
          box[index].remove(); // 삭제
        } else {
          alert("더이상 취소할 상품이 존재하지 않습니다.");
        }
      }
    });
  });
});
