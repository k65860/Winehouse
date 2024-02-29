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
    const res = await fetch("/product");
    //data json형식으로 불러오기
    const data = await res.json();
    // console.log(data);

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

    
      // dataNameElement.textContent = product.product_name;
      // dataRowDiv.appendChild(dataNameElement);

      // // data-price에 product_price 추가
      // const dataPriceElement = document.createElement("a");
      // dataPriceElement.id = "data-price";
      // dataPriceElement.textContent = product.product_price;
      // dataRowDiv.appendChild(dataPriceElement);
    });

    // // id가 'data-name'인 a 태그에 상품 type 추가
    // const dataNameElement = document.getElementById("data-name");
    // dataNameElement.textContent = `${product_name}`;

    // // 0번째 요소의 product_price 값 불러오기
    // const product_price = products.length > 0 ? products[0].product_price : "No data"; // 데이터가 없으면 'No data'를 표시

    // const dataPriceElement = document.getElementById("data-price");

    // dataPriceElement.textContent = `${product_price}`;
  } catch (err) {
    console.log(err);
  }
});