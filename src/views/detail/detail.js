document.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    const res = await fetch(`/product/info/${productId}`);
    const data = await res.json();
    //console.log(data);

    const products = data.data;
    console.log(products);

    const productsContainer = document.querySelector(".detailDiv");
    productsContainer.innerHTML = ""; // 기존 상품 목록 초기화

    const productElement = document.createElement("div");
    productElement.classList.add("detailBox");

    productElement.innerHTML += `
        <div class="detailRow">
          <a id="detailFont">이름</a>
          <a id="data-name">${products.product_name}</a>
        </div>
        <div class="detailRow">
          <a id="detailFont">가격</a>
          <a id="data-price">${products.product_price}</a>
        </div>
        <hr class="hr">
        <div class="detailRow" id="quantity">
          <a id="detailFont">수량</a>
        <div>
          <button id="minus" class="quantityBtn">-</button>
           <a id='result'>1</a>
          <button id="plus" class="quantityBtn">+</button>
          </div>
        </div>
        <div class="detailRow">
          <a id="detailFont">총가격</a>
          <a id="data-totalPrice">${products.product_price}</a>
        </div>
        <div class="buttonDiv">
          <button class="button is-light is-fullwidth mt-5" id="cartBtn">장바구니</button>
          <button class="button is-primary is-fullwidth mt-5" id="payBtn">결제하기</button>
        </div>
    `;
    productsContainer.appendChild(productElement);

    // 마이너스 플러스 버튼
    let resultElement = document.getElementById("result");
    let resultValue = parseInt(resultElement.innerText);
    let totalPriceElement = document.getElementById('data-totalPrice');

    document.getElementById("plus").addEventListener("click", function () {
      // resultValue 값을 1씩 증가시킵니다.
      resultValue++;
      resultElement.innerText = resultValue;
      totalPriceElement.innerHTML = products.product_price * resultValue;
    });

    document.getElementById("minus").addEventListener("click", function () {
      // resultValue 값이 1보다 큰 경우에만 감소
      if (resultValue > 1) {
        resultValue--;
        resultElement.innerText = resultValue;
        totalPriceElement.innerHTML = products.product_price * resultValue;
      }
    });

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

  // 결제하기 버튼
  document.getElementById("payBtn").addEventListener("click", function () {
    window.location.href = "/order";
  });
  } catch (err) {
    console.log(err);
  }
});