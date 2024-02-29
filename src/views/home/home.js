document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/product');
    const data = await res.json();
    // console.log(data);

    const products = data.data.reverse().slice(0, 5); // 최신 5개 상품만
    // console.log(products);
    
    const recentlyProductsContainer = document.querySelector('.recently-container');

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('products-container');

      productElement.innerHTML += `
        <a href="/detail?productId=${product._id}">
          <img src="https://cdn.pixabay.com/photo/2013/07/12/16/28/wine-150955_1280.png" alt="${product.product_name}">
        </a>
        <span class="product-name">${product.product_name}</span>
        <span class="product-price">${product.product_price}</span>
      `;
      recentlyProductsContainer.appendChild(productElement);
    })

  } catch (err) {
    console.log(err);
  }
});