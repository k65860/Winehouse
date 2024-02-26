// 추가 버튼
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addBtn");

  if (addButton) {
    addButton.addEventListener("click", function () {
      var destinationUrl = "/admin_add"; // 이 부분을 이동하고 싶은 페이지의 URL로 변경하세요.

      window.location.href = destinationUrl;
    });
  }
});

// 수정 버튼
document.addEventListener("DOMContentLoaded", function () {
  const updateButtons = document.querySelectorAll("#updateBtn");

  updateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // 'admin_update' 페이지로 이동합니다.
      window.location.href = "/admin_update"; // 이동하고 싶은 페이지의 경로를 설정합니다.
    });
  });
});

// // 삭제 버튼
// document.addEventListener("DOMContentLoaded", function () {
//   const addButton = document.getElementById("deleteBtn");

//   if (addButton) {
//     addButton.addEventListener("click", function () {
//       // 삭제 버튼
//       var result = confirm("정말로 삭제하시겠습니까?");

//       // 사용자가 '예'를 선택했을 경우
//       if (result) {
//         // 클래스명이 'card'인 첫 번째 요소를 찾아 삭제합니다.
//         var cardToDelete = document.querySelector(".card");
//         if (cardToDelete) {
//           cardToDelete.remove(); // 삭제
//         }
//       }
//     });
//   }
// });

// 삭제 버튼
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll("#deleteBtn");

  // forEach를 사용하여 각 버튼에 클릭 이벤트를 추가합니다.
  deleteButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      // 사용자에게 확인 메시지를 표시합니다.
      const result = confirm("정말로 삭제하시겠습니까?");

      // 사용자가 '예'를 선택한 경우
      if (result) {
        // 클래스명이 'card'인 요소의 인덱스에 해당하는 요소를 삭제합니다.
        const cards = document.querySelectorAll(".card");
        if (cards.length > index) {
          cards[index].remove(); // 삭제
        } else {
          alert("더이상 삭제할 상품이 존재하지 않습니다.");
        }
      }
    });
  });
});
