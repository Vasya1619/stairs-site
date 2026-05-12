
document.querySelectorAll(".btn-image").forEach(button => {
  button.addEventListener("click", () => {
    const galleryId = button.dataset.gallery;
    const gallery = document.getElementById(galleryId);

    gallery.classList.toggle("active");
  });
});

const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    console.log(data);
});

document.querySelector('.button__loading')
.addEventListener('click', () => location.reload());

