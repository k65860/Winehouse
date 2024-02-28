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

// 추가 버튼 클릭 시
const addButton = document.querySelector('#add-button');

addButton.addEventListener('click', () => {
  alert('추가 되었습니다.');
  window.location.href = '/admin_product';
});
