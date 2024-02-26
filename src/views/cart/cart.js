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

///////////////////////////////////////////////////

// 페이지 로드 시 IndexedDB 초기화 함수 호출
window.onload = () => {
  initializeIndexedDB();
};

// IndexedDB 초기화 함수
function initializeIndexedDB() {
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
      // 장바구니 상품 출력
      displayCartItems();
    };
  }
}

// 장바구니 상품을 화면에 표시하는 함수
function displayCartItems() {
  const request = window.indexedDB.open('winehouse');
  let db;

  request.onsuccess = (event) => {
    db = event.target.result;
    const transaction = db.transaction(['cart'], 'readonly');
    const store = transaction.objectStore('cart');

    const requestGetItems = store.getAll();

    requestGetItems.onsuccess = (event) => {
      const cartItems = event.target.result;
      const cartContainer = document.querySelector('#cart-items');
      cartContainer.innerHTML = ''; // 기존 내용을 지우고 다시 표시

      cartItems.forEach((item) => {
        const card = createCardElement(item);
        cartContainer.appendChild(card);
      });
    };
  };
}

// 상품 카드 요소를 생성하는 함수
function createCardElement(item) {
  const card = document.createElement('div');
  card.classList.add('card', 'mb-5');

  card.innerHTML = `
    <div class="card-content">
      <div class="content">
        <div class="is-flex is-align-items-center">
          <label class="checkbox">
            <input type="checkbox" data-item-id="${item.id}">
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

  return card;
}

// 선택 삭제 버튼 클릭 시
const deleteSelectedButton = document.querySelector('#delete-selected-button');

deleteSelectedButton.addEventListener('click', () => {
  const checkedItems = document.querySelectorAll('#cart-items input[type="checkbox"]:checked');

  // 확인 메시지 표시
  if (checkedItems.length > 0) {
    const confirmDelete = confirm("선택한 상품을 삭제하시겠습니까?");
    if (confirmDelete) {
      checkedItems.forEach((item) => {
        const itemId = parseInt(item.dataset.itemId);
        deleteCartItem(itemId);
      });

      displayCartItems();
      alert("선택한 상품이 삭제되었습니다.");
    }
  } else {
    alert("삭제할 상품을 선택해주세요.");
  }
});

// 장바구니 상품 삭제 함수
function deleteCartItem(itemId) {
  const request = window.indexedDB.open('winehouse');
  let db;

  request.onsuccess = (event) => {
    db = event.target.result;
    const transaction = db.transaction(['cart'], 'readwrite');
    const store = transaction.objectStore('cart');

    const getRequest = store.get(itemId);
    getRequest.onsuccess = (event) => {
      const data = event.target.result;
      store.delete(data.id);
    };
  };
}
