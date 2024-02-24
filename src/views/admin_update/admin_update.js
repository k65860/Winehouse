// eslint-disable-next-line no-unused-vars
function previewFile(event) {
  const reader = new FileReader();
  // eslint-disable-next-line func-names, no-shadow
  reader.onload = function (event) {
    const img = document.createElement('img');
    img.setAttribute('src', event.target.result);
    document.querySelector('#img-container').appendChild(img);
  };

  reader.readAsDataURL(event.target.files[0]);
}
