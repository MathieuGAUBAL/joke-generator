import Joke from "./Joke.js";
import Setting from "./Setting.js";


async function fetchData() {
    let url = './fakeAPI.json';
    return await fetch(url).then(data => data.json()).then(data => { return data });
}

function start() {
    fetchData()
        .then(data => {
            let typeDefault = 'global';
            let main = new Joke(data);
            let setting = new Setting(main);
            
            //changer le type de blague
            document.querySelector('.selectors-type').addEventListener('change', (event) => {
                typeDefault = event.target.id;
                main.question(typeDefault);
                main.toggleBtn = true;
                main.displayBtn();
            })

            //demander la réponse à la blague
            document.querySelector('.btn-tell-me').addEventListener('click', () => {
                main.answer();
            })

            //demander une autre blague
            document.querySelector('.btn-another').addEventListener('click', () => {
                main.question(typeDefault);
                main.toggleBtn = !main.toggleBtn;
                main.displayBtn();
            })


            document.querySelector('.btn-settings').addEventListener('click', () => {
                document.querySelector('.settings-section').style.display = 'block';
                setting.displayJoke();
            })

            document.querySelector('.quit-setting').addEventListener('click', () => {
                document.querySelector('.settings-section').style.display = 'none';
            })

            document.querySelector('.add-joke').addEventListener('click', () => {
                setting.add();
          
            })

            document.querySelector('.btn-next').addEventListener('click', () => {
                setting.nextPage();
            });

            document.querySelector('.btn-previous').addEventListener('click', () => {
                setting.previousPage();
            });

            


            main.question(typeDefault);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    start();
});