function toggleMenu() {
    const navbarUl = document.querySelector('.navbar-left ul');
    navbarUl.classList.toggle('active');

    const uncSection = document.querySelector('.unc');
    const shopNowSection = document.querySelector('.shop-now');

    uncSection.classList.toggle('active');
    shopNowSection.classList.toggle('active');
}

function updateImage() {
    const imgElement = document.getElementById('responsiveImage');

    if (window.innerWidth < 1080) {
        imgElement.src = './img/sheadimg.png';
    } else {
        imgElement.src = './img/headimg.png';
    }
}

document.addEventListener('DOMContentLoaded', updateImage);

window.addEventListener('resize', updateImage);


document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar-left ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const navbarUl = document.querySelector('.navbar-left ul');
            if (navbarUl.classList.contains('active')) {
                navbarUl.classList.remove('active');

                const uncSection = document.querySelector('.unc');
                const shopNowSection = document.querySelector('.shop-now');

                uncSection.classList.remove('active');
                shopNowSection.classList.remove('active');
            }
        });
    });
});


const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.carousel-card');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let index;
window.innerWidth > 1080 ? index = 1 : index = 0;
const cardWidth = window.innerWidth > 1080 ? cards[0].offsetWidth - 145 : cards[0].offsetWidth + 22;
const totalCards = cards.length;

const firstClone = cards[0].cloneNode(true);
const lastClone = cards[totalCards - 1].cloneNode(true);

carousel.appendChild(firstClone);
carousel.insertBefore(lastClone, cards[0]);

carousel.style.transform = `translateX(-${index * cardWidth}px)`;

nextButton.addEventListener('click', () => {
    if (index >= totalCards + 1) return;
    index++;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    updateCarousel();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i + 1;
        updateCarousel();
    });
});

function updateCarousel() {
    carousel.style.transition = 'transform 0.4s ease-in-out';
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    updateDots();

    carousel.addEventListener('transitionend', () => {
        if (index === totalCards + 1) {
            carousel.style.transition = 'none';
            index = 1;
            carousel.style.transform = `translateX(-${index * cardWidth}px)`;
        } else if (index === 0) {
            carousel.style.transition = 'none';
            index = totalCards;
            carousel.style.transform = `translateX(-${index * cardWidth}px)`;
        }
    });
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    let activeIndex = index - 1;
    if (index === 0) {
        activeIndex = dots.length - 1;
    } else if (index === totalCards + 1) {
        activeIndex = 0;
    }
    dots[activeIndex].classList.add('active');
}



let currentIndex = 0;
let intervalId;

function updateSliderPosition() {
    const slider = document.getElementById('slider');
    const screenWidth = window.innerWidth;
    const offset = screenWidth < 576 ? -currentIndex * 305 : screenWidth < 768 ? -currentIndex * 150 : screenWidth < 1080 ? -currentIndex * 200 : -currentIndex * 70;
    slider.style.transform = `translateX(${offset}px)`;
}

function autoplay() {
    const totalCards = document.querySelectorAll('.card').length;

    intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalCards) {
            currentIndex = 0;
        }
        updateSliderPosition();
    }, 2000);
}

function handleScreenChange(e) {
    if (e.matches) {
        console.log("Screen width is now less than 1080px");
    } else {
        console.log("Screen width is now 1080px or more");
    }
    updateSliderPosition();
}

const mediaQuery = window.matchMedia('(max-width: 1079px)');

handleScreenChange(mediaQuery);
autoplay();

window.addEventListener('resize', updateSliderPosition);


