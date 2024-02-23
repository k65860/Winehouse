// burger
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  navbarMenu.classList.toggle('is-active');
});

function count(type)  {
  // 결과를 표시할 element
  const resultElement = document.getElementById('result');
  
  // 현재 화면에 표시된 값
  let number = resultElement.innerText;
  
  // 더하기/빼기
  if(type === 'plus') {
    number = parseInt(number) + 1;
  }
  else if(type === 'minus')  {
      if(number >= 1) {
          number = parseInt(number) - 1;
      }
      else {
          number = 0;
      }
  }
  
  // 결과 출력
  resultElement.innerText = number;
}

function cartBtn()  {
  window.location.href = '/list/list.html';
}

function payBtn()  {
  window.location.href = '결제완료url';
}