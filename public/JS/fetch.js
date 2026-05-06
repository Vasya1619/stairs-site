document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("gallerySelect");

  fetch("https://levelwood.pro/api/galleries")
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

document.getElementById("save").onclick = async () => {
  const id = document.getElementById("gallerySelect").value;

  await fetch("https://levelwood.pro/api/gallery/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      materials: document.getElementById("materials").value,
      duration: document.getElementById("duration").value
    })
  });

  await fetch("https://levelwood.pro/api/gallery/update-images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gallery_id: id,
      img1: document.getElementById("imageInput-1").value,
      img2: document.getElementById("imageInput-2").value,
      img3: document.getElementById("imageInput-3").value
    })
  });

  alert("Обновлено");
};

const BASE = "https://levelwood.pro";

fetch("https://levelwood.pro/api/images")
  .then(res => res.json())
  .then(files => {
    const galleries = document.querySelectorAll(".gallery");

    galleries.forEach(container => {
      files.forEach(file => {
        const img = document.createElement("img");

        img.src = `${BASE}/images/${file}`;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";

        container.appendChild(img);
      });
    });
  });

document.querySelectorAll(".gallery").forEach(gallery => {
  gallery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const inputId = gallery.dataset.input;
      const input = document.getElementById(inputId);

      input.value = e.target.src;
    }
  });
});
