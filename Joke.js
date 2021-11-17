export default class Joke {
    constructor(data) {
        this.arrayJokes = data;
        this.currentJoke = null;
        this.screenPhone = document.querySelector('.screen-phone');
        this.btnTellMe = document.querySelector('.btn-tell-me');
        this.btnAnother = document.querySelector('.btn-another');
        this.toggleBtn = true;
    }

    getRandomJoke = (array) => ~~(Math.random() * array.length);

    filterJoke(type) {
        let array = this.arrayJokes.filter(item => item.type === type);
        this.currentJoke = array[this.getRandomJoke(array)];
    }

    question = (type) => {
        console.log(type);
        if(type){
            this.filterJoke(type);
            this.eraseScreen();
            this.screenPhone.appendChild(this.buildElement('question', this.currentJoke?.joke ?? ''));
        }

    }

    answer = () => {
        this.screenPhone.appendChild(this.buildElement('answer', this.currentJoke?.answer ?? ''));
        this.toggleBtn = !this.toggleBtn;
        this.displayBtn();
    }

    buildElement = (classElement, text) => {
        let div = document.createElement('div');
        div.className = classElement;
        div.innerHTML = `<p>${text} </p>`;
        return div;
    }

    eraseScreen = () => {
        this.screenPhone.innerHTML = "";
    }

    displayBtn = () => {
        if(this.toggleBtn){
            this.btnTellMe.style.display = 'block';
            this.btnTellMe.style.margin = 'auto';
            this.btnAnother.style.display = 'none';  

        }else{
            this.btnTellMe.style.display = 'none';
            this.btnAnother.style.display = 'block';
            this.btnAnother.style.margin = 'auto';
        }

    }
}