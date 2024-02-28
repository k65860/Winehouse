// 사진 업로드
const inputImage = document.querySelector('#input-img');
inputImage.addEventListener('change', previewFile);

function previewFile(event) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const img = document.createElement('img');
    img.setAttribute('src', event.target.result);
    document.querySelector('#img-container').appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
}

// 카테고리 가져오기
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const res= await fetch('/category');
    const data = await res.json();

    if (data.status !== 200) {
      throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
    }

    const categories = data.data;
    // console.log(categories);

    // 셀렉트 박스 생성
    const selectElement = document.querySelector('.field select[name="type"]');

    // 카테고리 목록을 셀렉트 박스에 추가
    categories.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category._id;
      optionElement.textContent = category.category_name;
      selectElement.appendChild(optionElement);
    });

  } catch (error) {
    console.error('카테고리 불러오기 오류:', error);
  }
});

// 상품 추가
const form = document.querySelector('#form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const productName = document.querySelector('#name').value;
  const productPrice = document.querySelector('#price').value;
  const categoryId = document.querySelector('#type').value;
  const productCountry = document.querySelector('#country').value;
  const productGrape = document.querySelector('#grape').value;
  const productSweetrate = document.querySelector('#sweet').value;
  const productSourrate = document.querySelector('#sour').value;
  const productBodyrate = document.querySelector('#body').value;
  const productMadeyear = document.querySelector('#year').value;

  const formData = {
    productName,
    productPrice,
    categoryId,
    productCountry,
    productGrape,
    productMadeyear,
    productSweetrate,
    productSourrate,
    productBodyrate,
  };

  if (!productName || !productPrice || !categoryId || !productCountry
    || !productGrape || !productMadeyear || !productSweetrate 
    || !productSourrate || !productBodyrate) {
    return alert("모든 값을 입력해 주세요.");
  }

  try {
    const res = await fetch('/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      throw new Error('상품을 추가하는데 실패했습니다.');
    }

    alert('추가 되었습니다.');
    window.location.href = '/admin_product';
  
  } catch (err) {
    console.error('상품 추가 오류: ', err);
  }
  
});

