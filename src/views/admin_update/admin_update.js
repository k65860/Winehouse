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

// 수정 버튼 클릭 시
const updateButton = document.querySelector('#update-button');

updateButton.addEventListener('click', () => {
  alert('수정 되었습니다.');
  window.location.href = '/admin_product';
});
