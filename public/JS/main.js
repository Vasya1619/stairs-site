function checkVisibility() {
    const title = document.querySelectorAll('.gallery__title, .hero__inner, .gallery__inner, .making__inner, .process__inner, .cladding__inner');
    
    title.forEach(title => {
        const rect = title.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Если блок появился в зоне видимости
        if (rect.top < windowHeight - 150) {
            title.classList.add('visible');
        }
    });
}

// Проверяем при скролле и при загрузке
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');

    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.onclick = () => {
    menu.classList.toggle("active");
};


const items = document.querySelectorAll('.toggle');

items.forEach(item => {
  item.addEventListener('click', () => {
    const desc = item.querySelector('.toggle-content');
    desc.classList.toggle('active');
  });
});