window.addEventListener('DOMContentLoaded', () => {
    function createTabs() {
        const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                })
            }
        })
    }
    function createTimer() {
        const deadLine = '2024-09-21';
    
        // разница между дедлайном и текушим временем
        function getTimeRemaining(endTime) {
            let days, hours, minutes, seconds;
            const t = Date.parse(endTime) - Date.parse(new Date());
    
            if (t <= 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                    minutes = Math.floor((t / 1000 / 60) % 60),
                    seconds = Math.floor((t / 1000) % 60);
            }
    
            return {
                'total': t,
                days,
                hours,
                minutes,
                seconds,
            };
        }
    
        function setClock(selector, endTime) {
            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
    
            // причина по которой вызываем его здесь, 
            // это для того чтобы убрать мигание 
            // без этого значение html сначало показыается
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endTime);
    
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
    
            }
        }
    
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    
        setClock('.timer', deadLine);
    }
    function createModal() {
        const modal = document.querySelector('.modal'),
            btnModal = document.querySelectorAll('[data-modal]');

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearTimeout(modalTimerId);
        }

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        btnModal.forEach(item => {
            item.addEventListener('click', openModal)
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        const modalTimerId = setTimeout(openModal, 50000);

        function showModalByScroll() {
            // - 1 это для каких то технических событий браузера
            // когда до конца страницы остается 1 px, модальное окно будет открываться
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);

    }
    function createCard() {
        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.classes = classes;
                this.transfer = 11434;
                this.changeToUZS();
            }

            changeToUZS() {
                this.price *= this.transfer;
            }

            render() {
                const element = document.createElement('div');

                if (this.classes.length === 0) {
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                } else {
                    this.classes.forEach(className => {
                        element.classList.add(className);
                    });
                }

                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> сумм/день</div>
                    </div>
                `;

                this.parent.append(element);
            }
        }

        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            6,
            '.menu .container',
        ).render();
        new MenuCard(
            'img/tabs/elite.jpg',
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            4,
            '.menu .container',
            'menu__item',
        ).render();
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            5,
            '.menu .container',
            'menu__item',
        ).render();
    }
    function createForm() {
        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
        };

        forms.forEach(item => {
            postData(item);
        });

        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    dislay: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterEnd', statusMessage);

                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');

                // заголовок устанавливать не нужно, оно устанавливается автоматически
                // request.setRequestHeader('Content-type', 'multipart/form-data');

                // но если нужно отправлять в формате json, его используем
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                const formData = new FormData(form);

                const object = {};
                formData.forEach(function (value, key) {
                    object[key] = value;
                });

                const json = JSON.stringify(object);

                // отправка на сервер
                // request.send(formData);
                request.send(json);

                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        // console.log(request.response);
                        showThanksModal(message.success);
                        form.reset();
                        statusMessage.remove();
                    } else {
                        showThanksModal(message.failure);
                    }
                });
            });
        }

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>x</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            }, 4000);
        }
    }
    function createCalc() {
        const result = document.querySelector('.calculating__result span');
        
        let sex, height, weight, age, ratio;
    
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex')
        } else {
            sex = 'famale';
            localStorage.setItem('sex', 'femele');
        }
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio')
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }
    
        function initLocalSettings(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                // console.log(elem);
                console.log(elem.getAttribute('id') === localStorage.getItem('sex'));
                // console.log(elem.getAttribute('data-ratio'));
    
                if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                    elem.classList.add(activeClass);
                }
    
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function calcTotal() {
            if (!sex || !ratio || !height|| !weight || !age) {
                result.textContent = '____';
                return;
            }
         
            if (sex === 'famale') {
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    
        calcTotal();
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.addEventListener('click', e => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'))
                    }
        
                    console.log(ratio, sex);
        
                    elements.forEach(item => {
                        item.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);
        
                    calcTotal();
                });
            })
        }
    
        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
        function getDynamicInformation(selector) {
            const input = document.querySelector(selector);
    
            input.addEventListener('input', () => {
                if (input.value.match(/\D/g)) {
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
    
                switch(input.getAttribute('id')) {
                    case 'height': 
                        height = +input.value;
                        break;
                    case 'weight': 
                        weight = +input.value;
                        break;
                    case 'age': 
                        age = +input.value;
                        break;
                }
                calcTotal();
            });
        }
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
    }
    function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
        const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              total = document.querySelector(totalCounter),
              current = document.querySelector(currentCounter),
              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
              width = window.getComputedStyle(slidesWrapper).width;
    
        let slideIndex = 1;
        let offset = 0;
    
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`
        } else {
            total.textContent = slides.length;
        }
        
        getActiveSlideFraction();
    
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '.5s all ease';
        slidesWrapper.style.overflow = 'hidden';
        
        slides.forEach(slide => {
            slide.style.width = width;
        });
    
        slider.style.position = 'relative';
    
        const indecators = document.createElement('ol'),
              dots = [];
        
        indecators.classList.add('carousel-indecators');
        indecators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indecators);
    
        for(let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;
            if (i == 0) {
                dot.style.opacity = 1;
            }
    
            indecators.append(dot);
            dots.push(dot);
        }
    
        function deletnotDigits(str) {
            return +str.replace(/\D/g, '');
        }
    
        next.addEventListener('click', () => {
            if (offset === deletnotDigits(width) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += deletnotDigits(width);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`
    
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }
    
            getActiveSlideFraction();
            getActiveDots();
        })
    
        prev.addEventListener('click', () => {
            if (offset === 0) {
                offset = deletnotDigits(width) * (slides.length - 1);
            } else {
                offset -= deletnotDigits(width);
            }
    
            slidesField.style.transform = `translateX(-${offset}px)`
    
            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }
    
            getActiveSlideFraction();
            getActiveDots();
        })
    
        dots.forEach(dot => {
            dot.addEventListener('click', e => {
                const slideTo = e.target.getAttribute('data-slide-to');
    
                slideIndex = slideTo;
                offset = deletnotDigits(width) * (slideTo - 1);
                slidesField.style.transform = `translateX(-${offset}px)`;
    
                getActiveSlideFraction();
                getActiveDots();
                
            })
        })
    
        function getActiveSlideFraction() {
            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        }
    
        function getActiveDots() {
            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;
        }
    }
    
    createTimer();
    createTabs();
    // createModal();
    createCard();
    createForm();
    createCalc();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide'
    });
});