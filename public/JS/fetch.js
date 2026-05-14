document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("gallerySelect");

    fetch("/api/galleries")
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;

        select.appendChild(option);
        });
    });
});

document.getElementById("save").addEventListener("click", async () => {

  const id = document.getElementById("gallerySelect").value;

  await fetch("/api/gallery/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      materials: document.getElementById("materials").value,
      duration: document.getElementById("duration").value,
      painting: document.getElementById("painting").value
    })
  });

  await fetch("/api/gallery/update-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gallery_id: id,
      img1: document.getElementById("imageInput-1").value,
      img2: document.getElementById("imageInput-2").value,
      img3: document.getElementById("imageInput-3").value
    })
  });

  // очистка ПОСЛЕ сохранения
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("materials").value = "";
  document.getElementById("duration").value = "";
  document.getElementById("painting").value = "";

  alert("Обновлено");
});


fetch('/api/images')
  .then(res => res.json())
  .then(files => {
    const galleries = document.querySelectorAll('.gallery');

    galleries.forEach(container => {
      files.forEach(file => {
        const img = document.createElement('img');

        img.src = `/images/${file}`;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";

        container.appendChild(img);
      });
    });
  });


// клики по галереям
document.querySelectorAll(".gallery").forEach(gallery => {
  gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {

      // убрать выделение у всех картинок этой галереи
      gallery.querySelectorAll("img").forEach(img => {
        img.classList.remove("active");
      });

      // добавить выделение выбранной
      e.target.classList.add("active");

      // запись src в input
      const inputId = gallery.dataset.input;
      const input = document.getElementById(inputId);

      input.value = e.target.src;
    }
  });
});
// допустим ты уже добавил картинки через fs или массив






