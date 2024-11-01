let countdown;
let timeLeft=10;
const timeDisplay=document.getElementById("time-left");
const consequenceDisplay =document.getElementById("consequence");
let consequences=[];
const passPotatoButton=document.getElementById("pass-potato-button");

async function loadConsequences() {
    try{
        const response=await fetch('consequences.json');
        const data=await response.json();
        consequences=data.consequences;
    } catch(error){
        console.error("Failed to load consequences: ",error);
    }
}

function startTimer(){
    timeLeft=Math.floor(Math.random()*6 )+5; //random time btw 5 and 10 seconds
    timeDisplay.textContent=timeLeft;

    countdown=setInterval( () => {
        timeLeft-=1;
        timeDisplay.textContent=timeLeft;

        if(timeLeft <=0){
            clearInterval(countdown);
            triggerConsequence();
        }
    }, 1000);
}

function triggerConsequence(){
    if(consequences.length >0){
        const randomConsequence=consequences[Math.floor(Math.random()*consequences.length)];
        consequenceDisplay.textContent = `Consequence: ${randomConsequence}`;
        consequenceDisplay.classList.remove("hidden"); //show consequence
    } else{
        consequenceDisplay.textContent="Cannot load consequences!";
        consequenceDisplay.classList.remove("hidden");
    }        
}        

function hideConsequence(){
    consequenceDisplay.classList.add("hidden");
}

passPotatoButton.addEventListener("click", () => {
    console.log("Pass teh potato button clicked");
    hideConsequence();
    startTimer();
})

window.onload=async function(){
    await loadConsequences();
    startTimer()
}