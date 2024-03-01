document.addEventListener("DOMContentLoaded", function () {
  const photos = document.querySelectorAll("#photo");

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      window.location.href = "/detail";
    });
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('categoryId');
    
    const res = await fetch(`/product/${categoryId}`);
    //data json형식으로 불러오기
    const data = await res.json();
    console.log(data);

    const products = data.data;
    console.log(products);

    const productsContainer = document.querySelector('.productPhoto1');
    productsContainer.innerHTML = ''; // 기존 상품 목록 초기화

    // products 배열을 순회하면서 각 상품의 정보를 dataRowDiv에 추가합니다.
    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('photoBox');

      productElement.innerHTML += `
          <img src="https://cdn.pixabay.com/photo/2018/01/12/09/45/glass-3077869_1280.jpg" id="photo">
            <div class="dataBox">
              <div class="dataRow">
                <a id="data-name">${product.product_name}</a>
              </div>
              <div class="dataRow">
                <a id="data-price">${product.product_price}</a>
              </div>
            </div>
    `;
    productsContainer.appendChild(productElement);
    });
  } catch (err) {
    console.log(err);
  }
});