// 카테고리 목록 가져오기
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const categoryRes = await fetch('/category');
    const categoryData = await categoryRes.json();

    if (categoryData.status !== 200) {
      throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
    }

    const categories = categoryData.data;
    // console.log(categories);

    // 셀렉트 박스
    const selectElement = document.querySelector('#categoryBtn');

    // 카테고리 목록을 셀렉트 박스에 추가
    categories.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category._id;
      optionElement.textContent = category.category_name;
      selectElement.appendChild(optionElement);
    });

    await displayProducts();

    // 카테고리 변경 시
    selectElement.addEventListener('change', displayProducts);

  } catch (err) {
    console.log(err);
  }
});

// 상품 출력 함수
async function displayProducts() {
  try {
    // 카테고리 목록 가져오기
    const categoryRes = await fetch('/category');
    const categoryData = await categoryRes.json();

    if (categoryData.status !== 200) {
      throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
    }

    const categories = categoryData.data;

    const selectElement = document.querySelector('#categoryBtn');
    const selectedCategory = selectElement.value;
    const url = selectedCategory === 'all' ? '/product' : `/product/${selectedCategory}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== 200) {
      throw new Error('카테고리별 상품 목록을 가져오는데 실패했습니다.');
    }

    const products = data.data;
    console.log(products);

    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = ''; // 기존 상품 목록 초기화


    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('card');

      const category = categories.find(cat => cat._id === product.category_id);
      const categoryText = category ? category.category_name : 'Unknown';

      productElement.innerHTML += `
        <div class="card-header">
          <p class="card-header-title">${product.product_name}</p>
        </div>

        <div class="card-content">
          <div class="content">

            <div class="field">
              <div class="imgDiv">
                <img src="https://cdn.pixabay.com/photo/2018/01/12/09/45/glass-3077869_1280.jpg" id="photo">
              </div>
            </div>

            <div class="field">
              <label class="label">가격</label>
              <p>${product.product_price}</p>
            </div>

            <div class="field">
              <label class="label">타입</label>
              <p>${categoryText}</p>
            </div>

            <div class="field">
              <label class="label">국가</label>
              <p>${product.product_country}</p>
            </div>

            <div class="field">
              <label class="label">포도 품종</label>
              <p>${product.product_grape}</p>
            </div>

            <div class="field">
              <label class="label">당도</label>
              <p>${product.product_sweetrate}</p>
            </div>

            <div class="field">
              <label class="label">산도</label>
              <p>${product.product_sourrate}</p>
            </div>

            <div class="field">
              <label class="label">바디</label>
              <p>${product.product_bodyrate}</p>
            </div>

            <div class="field">
              <label class="label">생산 연도</label>
              <p>${product.product_madeyear}</p>
            </div>

            <div class="buttonBox">
              <button class="button is-fullwidth is-light m-1" id="updateBtn" name="${product._id}">수정</button>
              <button class="button is-fullwidth is-danger m-1" id="deleteBtn">삭제</button>
            </div>
          </div><!--content-->
        </div><!--card-content-->
      `;
      productsContainer.appendChild(productElement);

    });

  } catch (err) {
    console.log(err);
  }
}

// 추가 & 수정 버튼
document.addEventListener('click', async (e) => {
  if (e.target && e.target.id === 'addBtn') { // 추가
    window.location.href = '/admin_add';
  } else if (e.target && e.target.id === 'updateBtn') { // 수정
    // 상품 아이디
    const productId = e.target.name;
    // 수정 페이지로 이동
    window.location.href = `/admin_update?productId=${productId}`;
  }
});

// 삭제 버튼
