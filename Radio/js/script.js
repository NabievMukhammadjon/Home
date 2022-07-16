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

let headerTabs = document.querySelector('.header__tabs-Btn');
let headerEther = document.querySelector('.header__ether-list');

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
  })
  headerTabs.addEventListener('click', function() {
    headerTabs.classList.toggle('is-active');
    headerEther.classList.toggle('is-active');
  })
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
