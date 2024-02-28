document.addEventListener("DOMContentLoaded", function () {
  const photos = document.querySelectorAll("#photo");

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      if (confirm("장바구니 페이지로 이동하시겠습니까?")) {
        window.location.href = "/detail";
      }
    });
  });
});
