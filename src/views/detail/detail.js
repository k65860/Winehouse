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

// window.addEventListener("beforeunload", (event) => {
//   // 표준에 따라 기본 동작 방지
//   event.preventDefault();
//   // Chrome에서는 returnValue 설정이 필요함
//   event.returnValue = "사이트를 새로고침하시겠습니까?";
// });
