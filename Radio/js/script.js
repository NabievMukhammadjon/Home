let podcastsBtn = document.querySelector('.podcasts__btn');
let podcastsNone = document.querySelector('.podcasts-none');

podcastsBtn.addEventListener('click', function(){
  podcastsNone.classList.toggle('active');
})  

$( function() {
  $( "#accordion" ).accordion({
      collapsible: true
  });
});

let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
let menuNav = document.querySelector('.header__nav');
let menuLinkList = document.querySelector('.header__links-nav');
let contentBottom = document.querySelector('.header__block-bottom');

let headerTabs = document.querySelector('.header__tabs-Btn');
let headerEther = document.querySelector('.header__ether-list');
let headerBgTabs = document.querySelector('.header__container-bottom');

headerTabs.addEventListener('click', function(){
  headerTabs.classList.toggle('is-active');
  headerEther.classList.toggle('is-active');
  headerBgTabs.classList.toggle('is-active')
})

const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false 
})

let tabName = document.querySelector('.accordion-list__tab');
// tabName.addEventListener('click', function(){
//   tabName.classList.toggle('is-active')
// })

window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#search').addEventListener('click', function() {
    document.querySelector('#searchForm').classList.toggle('is-active')
  })
  document.querySelector('#search').addEventListener('click', function () {
    document.querySelector('.header__search').classList.toggle('no-active')
  })
  document.querySelectorAll('.accordion-list__tab').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('is-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('is-active')
        tabName.classList.toggle('is-active')
    })
  })
  menuBtn.addEventListener('click', function(){
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    menuNav.classList.toggle('active');
    menuLinkList.classList.toggle('active');
    contentBottom.classList.toggle('active');
  })
  
  var open = document.querySelector(".header__btn");
  var close = document.querySelector(".sign-in__closed");
  var signIn = document.querySelector(".sign-in");

  var tl = gsap.timeline();


  tl.to(".sign-in", { duration: 0.5, opacity: 1, ease: "power1.out", onReverseComplete: removeClass })


  open.onclick = function () {
    tl.play();
  }

  close.onclick = function () {
    tl.reverse()
  }

  open.addEventListener("click", function () {
    this.classList.add("is-active");

    signIn.classList.add("is-active");
    document.body.style.overflow = 'hidden';
  });
  function removeClass() {
    signIn.classList.remove("is-active");
    document.body.removeAttribute('style');
  }
})

let myPlaylistsSlider = new Swiper('.playlists-slider', {
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
  mousewheel: {
    // Чувствительность колеса мыши
    sensitivity: 1,
    // Класс обьекта на котором будут срабатывать прокрутка мышью.(Лучше неиспользовать такой метод если у вас слайдов с таким классом много)
    // eventsTarget: ".image-slider"
  },
  slidesPerView: 2.3,
  slidesPerGroup: 1,
  spaceBetween: 15,   
})

let infoClients = new Swiper('.info-slider', {
  navigation: {
    nextEl: '.info-slider__btn-next',
    prevEl: '.info-slider__btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  sensitivity: 1,
  // slidesPerView: 2,
  slidesPerGroup: 1,
  spaceBetween: 0, 
  breakpoints: {
    1200: {
      slidesPerView: 2,

    },

    768: {
      slidesPerView: 2.3,
    },

    320: {
        slidesPerView: 2.3, 
    },
    1920: {
        slidesPerView: 4,
    }
  },
})

var input = document.getElementById('in-txt')
  ,value = input.value;

input.addEventListener('input', onInput);

function onInput(e){
  var newValue = e.target.value;
  if( newValue.match(/[^a-zA-Zа-яА-Я]/g)) {
     input.value = value;
     return;
  }
  value = newValue;
};

new JustValidate('.info__form', {
  rules: {
      name: {
          required: true,
          minLength: 2,
          maxLength: 20
      },
      mail: {
          required: true,
          errorMessage: 'no mail',
          email: true
      },
  },
})
