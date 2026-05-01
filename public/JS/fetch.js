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

document.getElementById("save").onclick = async () => {

  const id = document.getElementById("gallerySelect").value;

  // description
  await fetch("/api/gallery/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      price: document.getElementById("price").value,
      materials: document.getElementById("materials").value,
      duration: document.getElementById("duration").value
    })
  });

  // 2. images
  await fetch("/api/gallery/update-images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      gallery_id: id,
      img1: document.getElementById("img1").value,
      img2: document.getElementById("img2").value,
      img3: document.getElementById("img3").value
    })
  });


  alert("Обновлено");
};



