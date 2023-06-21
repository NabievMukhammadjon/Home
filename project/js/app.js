if (document.querySelector('.work__slider')) {
    new Swiper('.work__slider', {
        // Optional parameters
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        effect: 'flip',
        pagination: {
        el: '.work__pagination',
        clickable: true
        },
    
        
        // And if we need scrollbar
        scrollbar: {
        el: '.swiper-scrollbar',
        },
    });
}