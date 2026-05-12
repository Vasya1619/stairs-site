fetch("/api/galleries/full")
  .then(res => res.json())
  .then(data => {

    data.galleries.forEach(g => {

      const block = document.querySelector(`#gallery-${g.id}`);
      if (!block) return;

      // текст
      block.querySelector(".slide-bottom__title").textContent = g.title;
      block.querySelector(".description-box__price").textContent = g.price;
      block.querySelector(".description-box__materials").textContent = g.materials;
      block.querySelector(".description-box__duration").textContent = g.duration;
      block.querySelector(".description-box__painting").textContent = g.painting;
      
      // фотки
    const imgs = data.images
        .filter(img => img.gallery_id === g.id)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

    block.querySelector(".gallery__img-1").src = imgs[0]?.url_image || "";
    block.querySelector(".gallery__img-2").src = imgs[1]?.url_image || "";
    block.querySelector(".gallery__img-3").src = imgs[2]?.url_image || "";

    });
  });