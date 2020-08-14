const saveButton=document.getElementById("savebtn");
const username= document.getElementById("input");
const finalScore= document.getElementById("score");
const score= localStorage.getItem("recentScore");

finalScore.innerText="Score : "+ score;
username.addEventListener("keyup",()=>{
   saveButton.disabled= !username.value;
    
});
saveScore=(e)=>{
e.preventDefault();
}