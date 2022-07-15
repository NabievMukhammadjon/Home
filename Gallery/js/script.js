const swiper = new Swiper('.project-slider', {
  // loop: true,

  navigation: {
    nextEl: '.project-slider__button-next',
    prevEl: '.project-slider__button-prev',
  },

  // количество слайдов для показа
  slidesPerView: 3,

  // отступы
  spaceBetween: 50,

});

let myImageSlider = new Swiper('.gallery-slider', {
  navigation: {
    nextEl: '.slider-nav__btn-next',
    prevEl: '.slider-nav__btn-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },

  keyboard: {
    // включить\выключить
    enabled: true,
    // включить\выключить
    // только когда слайдер в пределах вьюпорта
    onlyInViewport: true,
    // включить\выключить
    // управление клавишами - pageUp, pageDown
    pageUpDown: true,
  },

  slidesPerView: 3,

  slidesPerGroup: 3,

  spaceBetween: 50,

});

let eventSlider = new Swiper('.event-slider', {
  navigation: {
    nextEl: '.event-slider__btn-next',
    prevEl: '.event-slider__btn-prev'
  },

  slidesPerView: 3,

  slidesPerGroup: 3,

  spaceBetween: 50,

  keyboard: {
    // включить\выключить
    enabled: true,
    // включить\выключить
    // только когда слайдер в пределах вьюпорта
    onlyInViewport: true,
    // включить\выключить
    // управление клавишами - pageUp, pageDown
    pageUpDown: true,
  },
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.name__tab').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.tab__content').forEach(function (tabContent) {
        tabContent.classList.remove('is-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('is-active')
    })
  })
});

// map
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("myMap1", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [48.940726, 2.367234],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 7
  });
  // Создание геообъекта с типом точка (метка).
  const myPlacemark = new ymaps.Placemark([48.872185, 2.354224], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [-20, 10],
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
};

const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false
})

$(function () {
  $("#accordion").accordion({
    collapsible: true
  });
});



// const catalogItem = document.querySelectorAll('.catalog__item');
// const listWrapper = document.querySelector('.name__list-wrapper');

// for (let element of catalogItem) {
//   element.addEventListener('click', function () {
//     element.classList.toggle('active');
//   })
// }




