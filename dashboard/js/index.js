
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const eventModal = document.getElementById('eventModal');
const saveEventBtn = document.getElementById('saveEventBtn');
let selectedDate = null;

// Создать календарь на текущий месяц
generateCalendar(currentMonth, currentYear);

// Прослушиватель событий для кнопок «Предыдущая» и «Далее»
prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Функция для создания календаря
function generateCalendar(month, year) {
    let getMounth = new Date(year, month).toLocaleString('en-US', { month: 'long' });

    // const mounthArrRu = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    // const mounthArrEng = ['January ', 'February ', 'March ', 'April ', 'May', 'June ', 'July', 'August', 'September', 'October', 'November', 'December'];
    // mounthArrRu.forEach((mounth, i) => {
    //     if (mounth === getMounth) {
    //         monthYearElement.textContent = `${mounthArrEng[i]} ${year}`;
    //     }
    // })

      monthYearElement.textContent = getMounth + ' ' + year;

    datesElement.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1),
          lastDayOfMonth = new Date(year, month + 1, 0);

    let startDay = firstDayOfMonth.getDay();
    const endDay = lastDayOfMonth.getDate();

    // console.log(firstDayOfMonth.getDay())
    
    for (let i = 0; i < 6; i++) {
        if ( startDay === 0 ) {
            startDay = 6;
            break
        } else {
            startDay = startDay - 1;
            break
        }
    }

    console.log(startDay)

    // const date = new Date();
    // const options = { weekday: 'long' };
    // const dayOfWeek = date.toLocaleString('en-US', options);

    // console.log(dayOfWeek);
    
    // прошлый месяц
    for (let i = 0; i < startDay; i++) {
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar-dash__date');
        datesElement.appendChild(dateElement);
    }

    for (let day = 1; day <= endDay; day++) {
        const dateElement = document.createElement('div');
        dateElement.textContent = day;
        dateElement.classList.add('calendar-dash__date');
        
        if (month === currentDate.getMonth() && year === currentDate.getFullYear() && day === currentDate.getDate()) {
            dateElement.classList.add('current-month');
        }

        dateElement.addEventListener('click', () => openEventModal(year, month, day));
        datesElement.appendChild(dateElement);
    }
}

// Функция открытия модального окна события
function openEventModal(year, month, day) {
    selectedDate = new Date(year, month, day);
    document.querySelector('.modal-content__data').textContent = selectedDate.toDateString() + ' ' + '13:00';
    eventModal.style.display = 'block';
}

// Функция закрытия модального окна события
function closeEventModal() {
    eventModal.style.display = 'none';
}

// Прослушиватель событий для модальной кнопки закрытия
const closeBtn = document.getElementsByClassName('close')[0];
closeBtn.addEventListener('click', closeEventModal);

// Прослушиватель событий для внешнего модального клика
window.addEventListener('click', (event) => {
    if (event.target === eventModal) {
        closeEventModal();
    }
});
