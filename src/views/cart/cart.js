// 수량 조절 함수
function adjustProductQuantity(type, productIndex) {
  const quantityElements = document.querySelectorAll('.quantity');
  const quantityElement = quantityElements[productIndex];

  let currentQuantity = parseInt(quantityElement.innerText);

  if (type === 'plus') {
    currentQuantity += 1;
  } else if (type === 'minus') {
    if (currentQuantity >= 2) {
      currentQuantity -= 1;
    } else {
      currentQuantity = 1;
    }
  }

  quantityElement.innerText = currentQuantity;
}

const cartContainer = document.querySelector('#cart-items');

// 플러스 버튼
cartContainer.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('quantity-plus-btn')) {
    const index = Array.from(
      cartContainer.querySelectorAll('.quantity-plus-btn')
    ).indexOf(event.target);
    adjustProductQuantity('plus', index);
  }
});

// 마이너스 버튼
cartContainer.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('quantity-minus-btn')) {
    const index = Array.from(
      cartContainer.querySelectorAll('.quantity-minus-btn')
    ).indexOf(event.target);
    adjustProductQuantity('minus', index);
  }
});

// 장바구니 기능
if (window.indexedDB) {
  const request = window.indexedDB.open('winehouse');
  let db;

  request.onupgradeneeded = (event) => {
    db = event.target.result;

    const objectStore = db.createObjectStore('cart', {
      keyPath: 'id',
      autoIncrement: true,
    });
    objectStore.createIndex('productImage', 'productImage', { unique: false });
    objectStore.createIndex('productName', 'productName', { unique: false });
    objectStore.createIndex('productPrice', 'productPrice', { unique: false });
  };

  request.onerror = (event) => {
    console.log(event.target.errorCode);
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    const transaction = db.transaction(['cart'], 'readonly');
    const store = transaction.objectStore('cart');

    const requestGetItems = store.getAll();
    
    requestGetItems.onsuccess = (event) => {
      const cartItems = event.target.result;
      // 장바구니 상품을 출력할 부분
      const cartContainer = document.querySelector('#cart-items');

      // 각 상품에 대한 카드 생성
      cartItems.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-5');

        card.innerHTML = `
          <div class="card-content">
            <div class="content">
              <div class="is-flex is-align-items-center">
                <label class="checkbox">
                  <input type="checkbox">
                </label>
                <div class="product-image m-2">
                  <img src="${item.productImage}" alt="Product Image" />
                </div>
                <div class="product-info">
                  <div class="product-name">
                    <p>${item.productName}</p>
                  </div>
                  <div class="product-price">
                    <p>${item.productPrice}원</p>
                  </div>
                </div>
              </div>
              <div class="count-button">
                <button class="quantity-minus-btn">-</button>
                <span class="quantity">1</span>
                <button class="quantity-plus-btn">+</button>
              </div>
            </div>
          </div>`;

        // 카드를 컨테이너에 추가
        cartContainer.appendChild(card);
      });
    };
  };
}
