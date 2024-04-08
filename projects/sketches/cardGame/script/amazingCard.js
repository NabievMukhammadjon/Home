import Card from'./card.js'

export default class AmazingCard extends Card {    
    constructor(container, cardNumber, action) {
        super(container, cardNumber, action);
        super.createElement();
        this.createElement(cardNumber);
    }

    set cardNumber(value) {
        this._photo = value
    }
    
    get cardNumber() {
        return this._photo
    }

    createElement(value) {
        const cardsImgArray = [
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.png',
            '/img/5.jpg',
            '/img/6.jpg',
        ];

        const img = document.createElement('img')
        img.src = cardsImgArray[value]
        img.classList.add('img');
        
        img.onerror = () => {
            img.src = '/img/default.jpg';
            throw new Error('Картинка не загружается');
        }
        
        if (this.displayElement) {
            this.displayElement.append(img);
        }
    }
}
