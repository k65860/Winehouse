// 결제 버튼
const payButton = document.querySelector('#payButton');

payButton.addEventListener('click', () => {
  /* eslint-disable */
  alert('결제 되었습니다.');
  window.location.href = '/mypage';
});
