const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionText=document.getElementById("serial");
const scoreText=document.getElementById("score");
const scoreBar= document.getElementById("fullBar");
const loader=document.getElementById("loader");
const game=document.getElementById("game");
var questions=[];
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple")
.then(res=>{
   return res.json();
})
.then(loadedQues=>{
    
   questions=loadedQues.results.map(loadedques=>{
   const formatted={
       question: loadedques.question
   }
   const anschoices=[...loadedques.incorrect_answers]
   formatted.ans= Math.floor(Math.random()*4)+1;
   anschoices.splice(formatted.ans-1,0,loadedques.correct_answer);
   anschoices.forEach((choice,index)=>{
 formatted["choice"+(index+1)]=choice;
   })
   
   return formatted;
   });
    
  startGame();
})
.catch(err=>{
    console.error(err);
})


let availableQues=[];
let currentQues= {};
let counter=0;
let max=15;
let score=0;


function startGame(){
    
   availableQues= [...questions];
   getNew();
   game.classList.remove("hidden");
   loader.classList.add("hidden");
   
};
function getNew(){

    if(availableQues.length===0){
        localStorage.setItem("recentScore",score);
        window.location.assign("/end.html");
    }

   
    counter++;
    questionText.innerText= counter+"/"+max ;
    const index = Math.floor(Math.random() * availableQues.length);
    scoreBar.style.width= (counter/max)*100 + "%" ;  
    currentQues = availableQues[index];
    question.innerText = currentQues.question;

choices.forEach((choice)=>{
const no= choice.dataset.number;
choice.innerText=currentQues["choice"+ no];
});
 
availableQues.splice(index,1);
};

 choices.forEach(function(choice){
     choice.addEventListener("click",function(event){
         const selected=event.target.dataset["number"];
        const classApply= selected==currentQues.ans ? "correct": "incorrect";
        if(classApply==="correct"){
            score=score+10;
            scoreText.innerText=score;
        }
        event.target.parentElement.classList.add(classApply);
        setTimeout(function(){
            event.target.parentElement.classList.remove(classApply);
            getNew();
        },800)
       
     });
     
 });
 




