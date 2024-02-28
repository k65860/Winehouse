document.addEventListener('DOMContentLoaded', function () {
  const cancelButtons = document.querySelectorAll('#product-pay-cancel');

  document
    .getElementById('update-button')
    .addEventListener('click', function () {
      window.location.href = '/update';
    });

  cancelButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const orderDetails = this.closest('.order-details');
      if (orderDetails) {
        orderDetails.remove();
        alert('주문이 취소되었습니다.');
      }
    });
  });
});
