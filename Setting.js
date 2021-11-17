export default class Setting {
    constructor(main) {
        this.main = main;
        this.currentJokeToAdd = {};
        this.type = null;
        this.select = document.querySelector('select');
        this.onChangeSelect();
        this.listJokes = document.querySelector('.list-jokes');
        this.numberJokePerPage = 10;
        this.currentPage = 1;
        this.numberPage = (this.main.arrayJokes.length / this.numberJokePerPage);
        this.page_end = ((Number(this.numberPage) === this.numberPage) && (this.numberPage % 1 !== 0)) ? ~~(this.numberPage) + 1 : this.numberPage;
        this.ligne_start = 0;
        this.ligne_end = this.numberJokePerPage;
        this.settingIsOpen = false;
       
    }

    onChangeSelect(){
        this.select.addEventListener('change', () => {
            this.type = this.select.options[this.select.selectedIndex].value;
        })
    }

    add() {
        let obj = {
            "id": 0,
            "type": "",
            "joke": "",
            "answer": ""
        }

        obj.joke = document.querySelector('#joke-question').value;
        obj.answer = document.querySelector('#joke-question').value;
        obj.id = this.main.arrayJokes[this.main.arrayJokes.length - 1].id + 1;
        obj.type = this.type;
        this.main.arrayJokes = [...this.main.arrayJokes, obj];
        this.eraseElement('tbody');
        this.displayJoke();
        this.update();
    }

    eraseElement(selector){
        document.querySelector(`${selector}`).innerHTML = "";
    }

    nextPage(){
        if(this.currentPage < this.page_end){
            this.eraseElement('tbody');
            this.ligne_start += this.numberJokePerPage;
            this.ligne_end += this.numberJokePerPage;
            this.currentPage++;
            this.update();
        }
    }

    previousPage(){
        if(this.currentPage > 1){
            this.eraseElement('tbody');
            this.ligne_start -= this.numberJokePerPage;
            this.ligne_end -= this.numberJokePerPage;
            this.currentPage--;
            this.update();
        }
    }



    update(){
        this.page_end = ((Number(this.numberPage) === this.numberPage) && (this.numberPage % 1 !== 0)) ? ~~(this.numberPage) + 1 : this.numberPage;
        this.numberPage = (this.main.arrayJokes.length / this.numberJokePerPage);
        this.displayJoke();
    }

    deleteJoke(){
        let buttons = document.querySelectorAll('tbody button');
        for(let btn of buttons){
            btn.addEventListener('click', (event) => {
                let number = +(event.target.className.split('-')[1]);
                this.main.arrayJokes = this.main.arrayJokes.filter(item => item.id !== number);
                this.update();
            })
        }
    }

    displayJoke(){
        let rows = "";

        for(let item of this.main.arrayJokes.slice(this.ligne_start, this.ligne_end)){
            rows += `<tr id=${item.id}><td scope="col">${item.id}</td><td scope="col">${item.joke}</td><td scope="col">${item.answer}</td><td scope="col">${item.type}</td><td scope="col"><button type='button' class='btn-${item.id}'>x</button></td>`;
        }
        let table =  `<table id="table-jokes"><caption>gestionnaire des blagues</caption><tbody><tr><th scope='col'>id</th><th scope='col'>joke</th><th scope='col'>answer</th><th scope='col'>type</th></tr>${rows}</tbody></table>` 
        this.listJokes.innerHTML = table;
        document.querySelector('.number-page').innerHTML = ` ${this.currentPage} / ${this.page_end}`;
        this.deleteJoke();
        console.log(this.main.arrayJokes);
    }
}