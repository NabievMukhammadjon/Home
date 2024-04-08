import Card from'./card.js'
import AmazingCard from './amazingCard.js';

function newGame(container, cardsCount) {
    // Создать поле
    
    let cardsNumberArray = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null;

    for(let i = 1; i <= cardsCount / 2; i++) {
        cardsNumberArray.push(i);
        cardsNumberArray.push(i);
    }
    
    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);
    
    for (const cardNumber of cardsNumberArray) {
        // cardsArray.push(new Card(container, cardNumber, flip));
        cardsArray.push(new AmazingCard(container, cardNumber, flip));
    }
    
    // Логика
    function flip(card) {
        if(firstCard !== null && secondCard !== null) {
            if(firstCard.cardNumber != secondCard.cardNumber) {
                firstCard.open = false;
                secondCard.open = false;
                firstCard = null;
                secondCard = null;
            }
        }
        if(firstCard == null) {
            firstCard = card;
        } else {
            if(secondCard == null) {
                secondCard = card
            }
        }

        if(firstCard !== null && secondCard !== null) {
            if(firstCard.cardNumber == secondCard.cardNumber) {
                console.log(firstCard)
                console.log(secondCard)
                firstCard.success = true;
                secondCard.success = true;
                firstCard = null;
                secondCard = null;
            }
        }

        if(document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
            // Сброс
            alert('Congratulation');
            container.innerHTML = '';
            cardsNumberArray = [];
            cardsArray = [];
            firstCard = null;
            secondCard = null;

            newGame( container, cardsCount + 2)
        }
    }
}

newGame(document.getElementById('game'), 6)