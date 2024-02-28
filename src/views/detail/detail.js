// document.addEventListener("DOMContentLoaded", function () {
// function count(type) {
//   // 결과를 표시할 element
//   const resultElement = document.getElementById("result");
//   const minusBtn = document.getElementById("minus");
//   const plusBtn = document.getElementById("plus");

//   // 현재 화면에 표시된 값
//   let number = resultElement.innerText;

//   // 더하기/빼기
//   if (type === "plus") {
//     number = parseInt(number, 10) + 1;
//   } else if (type === "minus") {
//     if (number >= 2) {
//       number = parseInt(number, 10) - 1;
//     } else {
//       number = 1;
//     }
//   }

//   // 결과 출력
//   resultElement.innerText = number;
// }

document.addEventListener("DOMContentLoaded", function () {
  // 장바구니 버튼 클릭 시 alert
  document
    .getElementById("cartBtn")
    .addEventListener("click", function (event) {
      // 사용자에게 확인 메시지를 띄움
      const result = confirm(
        "장바구니에 담겼습니다. 장바구니 페이지로 이동하시겠습니까?"
      );

      // 사용자가 확인을 선택한 경우
      if (result) {
        // 장바구니 페이지로 이동
        window.location.href = "/cart";
      } else {
        // 아무런 동작도 하지 않음
        event.preventDefault();
      }
    });

  // 마이너스 플러스 버튼
  const resultElement = document.getElementById("result");
  let resultValue = parseInt(resultElement.innerText);

  document.getElementById("plus").addEventListener("click", function () {
    // resultValue 값을 1씩 증가시킵니다.
    resultValue++;
    resultElement.innerText = resultValue;
  });

  document.getElementById("minus").addEventListener("click", function () {
    // resultValue 값이 1보다 큰 경우에만 감소
    if (resultValue > 1) {
      resultValue--;
      resultElement.innerText = resultValue;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // 장바구니 버튼
  document.getElementById("cartBtn").addEventListener("click", function () {
    window.location.href = "/cart";
  });

  // 결제하기 버튼
  document.getElementById("payBtn").addEventListener("click", function () {
    window.location.href = "/order";
  });
});
