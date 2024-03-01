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
    products.forEach(async product => {
      const imageId = product.image_id;
      console.log(imageId);

      const imgRes = await fetch(`/product/image/${imageId}`);
      const imgData = await imgRes.json();
      const imgSrc = imgData.data;

      const productElement = document.createElement('div');
      productElement.classList.add('photoBox');

      productElement.innerHTML += `
        <a href="/detail?productId=${product._id}">
          <span id="photo">${imgSrc}</span>
        </a>
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

// document.addEventListener("DOMContentLoaded", function () {
//   const photos = document.querySelectorAll("#photo");

//   photos.forEach((photo) => {
//     photo.addEventListener("click", () => {
//       window.location.href = `${product.product_id}`;
//     });
//   });
// });