
document.querySelectorAll(".btn-image").forEach(button => {
  button.addEventListener("click", () => {
    const galleryId = button.dataset.gallery;
    const gallery = document.getElementById(galleryId);

    gallery.classList.toggle("active");
  });
});