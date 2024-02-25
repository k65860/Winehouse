// +, - 버튼
// eslint-disable-next-line no-unused-vars
function count(type, productIndex) {
  // 결과를 표시할 element
  const resultElements = document.querySelectorAll('#quantity');
  const resultElement = resultElements[productIndex - 1];

  // 현재 화면에 표시된 값
  let number = resultElement.innerText;

  // 더하기/빼기
  if (type === 'plus') {
    number = parseInt(number, 10) + 1;
  } else if (type === 'minus') {
    if (number >= 2) {
      number = parseInt(number, 10) - 1;
    } else {
      number = 1;
    }
  }

  // 결과 출력
  resultElement.innerText = number;
}

document.addEventListener('DOMContentLoaded', () => {
  const minusButtons = document.querySelectorAll('#quantityBtnMinus');
  const plusButtons = document.querySelectorAll('#quantityBtnPlus');

  // 마이너스 버튼
  minusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      count('minus', index + 1); // 해당 상품의 인덱스를 전달하여 수량 조절
    });
  });

  // 플러스 버튼
  plusButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      count('plus', index + 1); // 해당 상품의 인덱스를 전달하여 수량 조절
    });
  });
});
