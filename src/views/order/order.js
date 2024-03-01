/* eslint-disable no-unused-vars */
document.addEventListener("DOMContentLoaded", function () {
  const paymentButton = document.getElementById("payButton");
  const paymentMethodRadios = document.querySelectorAll(
    '[name="paymentMethod"]'
  );
  const termsAgreeCheckbox = document.getElementById("termsAgree");
  const paymentErrorMessage = document.getElementById("paymentErrorMessage");
  const termsErrorMessage = document.getElementById("termsErrorMessage");
  const paymentSuccessMessage = document.getElementById(
    "paymentSuccessMessage"
  );

  // 결제 버튼 클릭 제외하고 페이지를 새로고침하거나 나갈때 경고창 뜨는 함수
  window.addEventListener("beforeunload", function (event) {
    if (!paymentButtonClicked) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  // 결제 버튼 클릭에만 경고창이 안뜸
  let paymentButtonClicked = false;
  paymentButton.addEventListener("click", function () {
    paymentButtonClicked = true;
  });

  // 결제 수단 중 하나가 선택되었는지 확인하는 함수
  function isPaymentMethodSelected() {
    for (const radio of paymentMethodRadios) {
      if (radio.checked) {
        return true;
      }
    }
    return false;
  }

  // 약관 동의 체크 여부를 확인하는 함수
  function areTermsAgreed() {
    return termsAgreeCheckbox.checked;
  }

  // 결제 버튼 상태를 업데이트하는 함수
  function updatePaymentButtonState() {
    // 에러 메시지 숨기기
    paymentErrorMessage.style.display = "none";
    termsErrorMessage.style.display = "none";
    paymentSuccessMessage.style.display = "none";

    // 결제 수단선택 안될 시
    if (!isPaymentMethodSelected()) {
      paymentErrorMessage.style.display = "block";
    }

    // 약관 동의선택 안될 시
    if (!areTermsAgreed()) {
      termsErrorMessage.style.display = "block";
    }
  }

  for (const radio of paymentMethodRadios) {
    radio.addEventListener("change", updatePaymentButtonState);
  }

  // 약관 동의 체크박스에 변경 이벤트 리스너 추가
  termsAgreeCheckbox.addEventListener("change", updatePaymentButtonState);

  // 결제 버튼 클릭
  paymentButton.addEventListener("click", function (event) {
    // 결제 수단이 선택안될 시 에러 메시지
    if (!isPaymentMethodSelected()) {
      paymentErrorMessage.style.display = "block";
    }

    // 약관에 동의 안할 시 에러 메시지
    if (!areTermsAgreed()) {
      termsErrorMessage.style.display = "block";
    }

    if (isPaymentMethodSelected() && areTermsAgreed()) {
      window.location.href = "/detail";
    }
  });

  // 초기 상태 확인
  updatePaymentButtonState();
});
