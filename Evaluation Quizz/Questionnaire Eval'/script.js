const welcomeScreen = document.querySelector(".welcomeScreen");
console.log(welcomeScreen);
const quizScreen = document.querySelector(".quizScreen");
console.log(quizScreen);
const scoreScreen =document.querySelector(".scoreScreen");
console.log(scoreScreen);
const buttomStart = document.querySelector("#start");
console.log(buttomStart);
const buttomChek = document.querySelector(".btn.btn-primary");
console.log(buttomChek);
const buttomRestart = document.querySelector('#restart');
console.log(buttomRestart);
const answers = document.querySelector('.answer-card');
console.log(answers);
const suivante = document.querySelector('#next');
let index = 0;
console.log(index);
let score = 0;
console.log(score);
let reponses = document.querySelectorAll('label');
console.log(reponses);
const nbsQuestion = 9;
console.log(nbsQuestion);
const usernameInputElt = document.getElementById('name');
usernameInputElt.textContent = "";
console.log(usernameInputElt);
const userName = usernameInputElt.value.trim();
console.log(userName);
const eltLi = document.querySelectorAll('.choix');
console.log(eltLi);
const tableauScore = 5;

// Connexion avec le fichier Json 
 let questions = {};
 getData();

 async function getData(){
     const reponse = await fetch('questions.json');
     questions = await reponse.json();
     console.log(questions);
// Création de la notion de question aléatoire     
     const test = questions.sort((a, b) => 0.5 - Math.random());
     console.log(test);
 }
  /**
   * @type {array}
   *  */
//const questions = data.questions;

//Création évenement pour passer de l'écran d'acceuil au questionnaire
buttomStart.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    const usernameInputElt = document.getElementById('name');
    usernameInputElt.textContent = "";
    console.log(usernameInputElt);
    const userName = usernameInputElt.value.trim();
    console.log(userName);
    if(userName == '') {
        alert('Veuillez rentrer un nom');
        return;
    } else {
    welcomeScreen.style.display ='none';
    quizScreen.style.display ='flex';
    }
    localStorage.setItem("nom", usernameInputElt.value);
    createQuestion(questions[index]);
})
//Création événement pour valider la réponse
buttomChek.addEventListener('click', () => {
    answers.style.display = 'flex';
    buttomChek.style.display = 'none';
// Création boucle pour récupérer la réponse du joueur

    let userChoix;
    for (let i = 0; i < eltLi.length; i++) {
        if(eltLi[i].checked) {
            userChoix = eltLi[i];
            console.log(userChoix.value);
        } 
    }    
// Création des conditions pour vérifier si la réponse du joueur et celle de la question sont les mêmes
    const correctionIndex = questions[index].correction;
    console.log(correctionIndex);
    if(userChoix.value == questions[index].correction){
        console.log('good');
        userChoix.parentNode.style.backgroundColor = 'green';
        score++;
    } else {
        console.log('wrong');
        userChoix.parentNode.style.backgroundColor = 'red';
        reponses[correctionIndex].parentNode.style.backgroundColor = 'green';
        score--;
    }
// Création des conditions relatives au score
const resultat = document.querySelector('.nom');
if (localStorage.getItem('nom') != null)
resultat.textContent = `Félicitations ! ${localStorage.getItem('nom')+" " + "ton score est de :"}`;
const encouragement = document.querySelector('.encouragement');
encouragement.textContent = ""; 
const viewScore = document.querySelector('.score')
viewScore.textContent = score +" "+ "points";
    if(score <= 3){
        encouragement.textContent = "Petit conseil d'amie, il faut t'accrocher et ne rien lâcher, ça va rentrer.";
    } else if (score <=6){
        encouragement.textContent = "C'est plutôt pas mal, tu y es presque, continue ton apprentissage.";
    } else if (score <=8){
        encouragement.textContent ="Nous avons là, un fin connaiseur à ce que je vois, félicitation pour tes connaissances.";
    } else if (score <=10){
        encouragement.textContent = "Félicitation, l'HTML, le CSS et le javaScript n'ont plus de secret pour toi. Voyons si tu rentres au palmares.";
    }
const scoreFinal =document.querySelector('.scoreFinal');
scoreFinal.textContent ="";
scoreFinal.textContent = score +" "+ "points";
localStorage.setItem("score", score.valueOf());
})
//Création événement pour charger une nouvelle question
suivante.addEventListener('click', () => {
    buttomChek.style.display = 'flex';
     const li = document.getElementsByClassName('li');
     for(let i = 0; i < li.length; i++){
        li[i].style.background = '#4e7ffb';
     }
    if(index != nbsQuestion) {
        createQuestion(questions[++index]);
        answers.style.display = 'none';
        for(let i=0;i<eltLi.length;i++)
        eltLi[i].checked = false;
    } else {
        quizScreen.style.display ='none';
        scoreScreen.style.display ='flex';
        for(let i=0;i<eltLi.length;i++)
        eltLi[i].checked = false;
 // Creation du tableau des meilleures scores dans le local storage plus le tri
        const nomScore ={
            nom : usernameInputElt.value,
            score : score
        };
        console.log(nomScore);
        if(localStorage.getItem('nomScore') == null){
            localStorage.setItem('nomScore', '[]');
        }
        let highScore = JSON.parse(localStorage.getItem('nomScore')); 
        highScore.push(nomScore);
        localStorage.setItem("nomScore", JSON.stringify(highScore));
        highScore.sort((a,b) => {
            return b.score - a.score;
        })
        highScore.splice(5);
        console.log(highScore);
        let tableauScore = document.querySelector('.tableauScore');
        console.log(tableauScore);

        for (let i=0; i < highScore.length; i++) {
          tableauScore.innerText += (highScore[i].nom +" "+ highScore[i].score + " " + "points\n");
          const lis = document.createElement('li');
          tableauScore.appendChild(lis);
          console.log(lis);
        }
    }   
})
// Création de la fonction au click pour le bouton restart
buttomRestart.addEventListener('click', () =>{
    scoreScreen.style.display ='none';
    welcomeScreen.style.display ='flex';
    location.reload();
})
// Création de la fonction pour changer la question, les réponses avec le fichier Json
function createQuestion (questionList) {
    // je récupère mon élément h4 et je charge la question Json dedans
    const questionHtml = document.querySelector('.card-text');
    questionHtml.textContent = (questionList.question);
    // je récupère mon élément label et je charge la réponse Json dedans
    const reponse = document.querySelectorAll('label');
    reponse.textContent = (questionList.reponses);
    // je récupère mon élément p et je charge mes informations Json dedans
    const infoComp = document.querySelector('.info');
    infoComp.textContent = (questionList.information);
    // je récupère mes label et je charge les réponses Json dedans
    reponses[1].textContent = questionList.reponses[0];
    reponses[2].textContent = questionList.reponses[1];
    reponses[3].textContent = questionList.reponses[2];
    reponses[4].textContent = questionList.reponses[3];
return(questionList);
}







