document.addEventListener("DOMContentLoaded", function () {
  const photos = document.querySelectorAll("#photo");

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      window.location.href = "/detail";
    });
  });
});
