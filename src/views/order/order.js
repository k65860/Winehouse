document.addEventListener("DOMContentLoaded", async function (event) {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const userInfo = await fetchUserInfo(token);

  async function fetchUserInfo(token) {
    const apiUrl = "/user";

    try {
      if (!token) {
        window.location.href = '/login';
        return null;
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userInfo = await response.json();
        initializeUserInfo(userInfo);
        return userInfo;
      } else {
        console.error('사용자 정보를 가져오지 못했습니다. 상태 코드:', response.status);
        return null;
      }
    } catch (error) {
      console.error('에러:', error);
      return null;
    }
  }

  function initializeUserInfo(userInfo) {
    const nameInput = document.getElementById('nameInput');
    const phoneNumberInput = document.getElementById('telInput');
    const addressInput = document.getElementById('addressInput');

    nameInput.value = userInfo.data.name;
    phoneNumberInput.value = userInfo.data.tel;
    addressInput.value = userInfo.data.address;
  }

  const paymentButton = document.getElementById("payButton");
  paymentButton.addEventListener("click", async function () {
    const checkedItems = document.querySelectorAll('#cart-items input[type="checkbox"]:checked');

    const request = window.indexedDB.open('winehouse');

    request.onsuccess = async (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['order'], 'readwrite');
      const store = transaction.objectStore('order');

      if (checkedItems.length > 0) {
        const confirmDelete = confirm('선택한 상품을 결제하시겠습니까?');
        if (confirmDelete) {
          const items = [];

          checkedItems.forEach((checkbox) => {
            const itemCard = checkbox.closest('.card');
            const itemImage = itemCard.querySelector('img').src;
            const itemName = itemCard.querySelector('.product-name').innerText;
            const itemPriceElement = itemCard.querySelector('.product-price p');
            const itemPrice = parseInt(itemPriceElement.innerText.replace('원', ''));
            const itemQuantity = parseInt(itemCard.querySelector('.quantity').innerText);

            items.push({
              productName: itemName,
              productPrice: itemPrice,
              productQuantity: itemQuantity,
              productImage: itemImage,
            });
          });

          await addItemsToOrderStore(store, items);

          window.location.href = '/order';
        }
      } else {
        alert('결제할 상품을 선택해주세요.');
      }
    };
  });

  async function addItemsToOrderStore(store, items) {
    return new Promise((resolve, reject) => {
      const request = store.add(items);

      request.onsuccess = (event) => {
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
});
