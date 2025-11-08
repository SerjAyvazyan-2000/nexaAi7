let heroSwiper = new Swiper(".hero-swiper", {
  spaceBetween: 20,
  slidesPerView: 3,
  loop: true,
  centeredSlides: true,

  autoplay: {
    delay: 1,
    disableOnInteraction: false,
  },
  speed: 3000,
  on: {
    slideChange: updateImproveHeroStyle,
    transitionStart: updateImproveHeroStyle,
  },
  breakpoints: {
    320: { slidesPerView: 2.1, spaceBetween: 8 },
    400: { slidesPerView: 2.5, spaceBetween: 8 },
    500: { slidesPerView: 3 },
    600: { slidesPerView: 2.5 },
    700: { slidesPerView: 3 },
    800: { slidesPerView: 4 },
    1000: { slidesPerView: 5, spaceBetween: 12 },
    1399: { slidesPerView: 5.3, spaceBetween: 12 },
  },
});

function updateImproveHeroStyle() {
  const allItemsImprove = document.querySelectorAll(".improve-hero-card");

  allItemsImprove.forEach((item) => {
    const lowQuality = item.getAttribute("data-low");
    const highQuality = item.getAttribute("data-high");
    const cardName = item.querySelector(".improve-card-name p");

    const slide = item.closest(".swiper-slide");
    if (slide.classList.contains("swiper-slide-active")) {
      item.classList.add("active");

      // setTimeout(() => {
      //     cardName.textContent = "Результат";
      // }, 300);

      // Обновляем фон плавно
      // setTimeout(() => {
      //     if (highQuality) {
      //         item.style.backgroundImage = `url('${highQuality}')`;
      //
      //     }
      // }, 300);
    } else {
      // cardName.textContent = "Оригинал";
      item.classList.remove("active");
      //
      // if (lowQuality) {
      //     item.style.backgroundImage = `url('${lowQuality}')`;
      //
      // }
    }
  });
}

updateImproveHeroStyle();






let reviewsSwiper;
let currentDirection;
let featuresSwiper;

function initSwiper() {
  const isMobile = window.innerWidth <= 992;
  const isFeaturesMobile = window.innerWidth <= 768;
  const direction = isMobile ? "horizontal" : "vertical";

  if (isFeaturesMobile) {
    if (!featuresSwiper) {
      featuresSwiper = new Swiper(".features__swiper", {
        spaceBetween: 20,
        slidesPerView: 2,
        pagination: {
          el: ".features-pagination",
          clickable: true,
        },
        breakpoints: {
          300: { slidesPerView: 1, spaceBetween: 8 },
          400: { slidesPerView: 1, spaceBetween: 8 },
          500: { slidesPerView: 1.5, spaceBetween: 8 },
          600: { slidesPerView: 2 },
        },
      });
    }
  } else {
    if (featuresSwiper) {
      featuresSwiper.destroy(true, true);
      featuresSwiper = null;
    }
  }

  if (reviewsSwiper && currentDirection === direction) return;

  if (reviewsSwiper) reviewsSwiper.destroy(true, true);

  currentDirection = direction;

  reviewsSwiper = new Swiper(".reviews-swiper", {
    direction,
    loop: true,
    speed: isMobile ? 600 : 5500,

    autoplay: !isMobile && {
      delay: 0,
      disableOnInteraction: false,
    },

    allowTouchMove: isMobile,

    slidesPerView: 3,
    spaceBetween: 10,

    pagination: {
      el: ".reviews-pagination",
      clickable: true,
    },

    breakpoints: {
      320: { slidesPerView: 1 },
      576: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
    },
  });

  const wrapper = document.querySelector(".reviews-swiper");
  wrapper.onmouseenter = () => !isMobile && reviewsSwiper.autoplay?.stop?.();
  wrapper.onmouseleave = () => !isMobile && reviewsSwiper.autoplay?.start?.();

}

window.addEventListener("load", initSwiper);
window.addEventListener("resize", () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(initSwiper, 250);
});