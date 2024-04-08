export default class Card {    
    constructor(container, cardNumber, action) {
        this.container = container;
        this.cardNumber = cardNumber;
        this.action = action;
        this.open = false;
        this.success = false;
    }
    
    set cardNumber(value) {
        this._number = value;
        if (this.displayElement) this.displayElement.textContent = value;
    }

    get cardNumber() {
        return this._number;
    }
    
    set open(value) {
        this._open = value;
        if (this.displayElement) {
            value ? this.displayElement.classList.add('open') : this.displayElement.classList.remove('open')

        }
    }   
    
    get open() {
        return this._open
    }

    set success(value) {
        this._success = value;
        if (this.displayElement) {
            value ? this.displayElement.classList.add('success') : this.displayElement.classList.remove('success');
        }
    }

    get success() {
        return this._open
    }

    createElement() {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.addEventListener('click', () => {
            if(this.open == false && this.success == false) {
                this.open = true;
                this.action(this);
            }
        });  

        this.container.append(card);
        this.displayElement = card;
    }
}