let countdown;
let timeLeft=10;
const timeDisplay=document.getElementById("time-left");
const consequenceDisplay=document.getElementById("consequence");
const passPotatoButton=document.getElementById("pass-potato-button");
let consequences=[];

async function loadConsequences() {
    try {
        const response=await fetch('consequences.json');
        if(!response.ok){
            throw new Error("Network error");
        }  
        const data=await response.json();
        consequences=data.consequences;
        console.log("Consequences loaded: ",consequences);      
    } catch (error) {
        console.error("Failed to load consequences: ",error);
    }    
}

function startTimer(){
    console.log("Timer starting");
    timeLeft=Math.floor(Math.random()*6)+5; //random time btw 5 and 10 seconds
    timeDisplay.textContent=timeLeft;

    countdown=setInterval(() => {
        console.log("Running timer interval");
        timeLeft-=1;
        timeDisplay.textContent=timeLeft;
        console.log("Time left: ",timeLeft);

        if(timeLeft<=0){
            clearInterval(countdown);
            triggerConsequence();
        }
    }, 1000);
}

function triggerConsequence(){
    if(consequences.length>0){
        const randomConsequence=consequences[Math.floor(Math.random())*consequences.length];
        consequenceDisplay.textContent=`Consequence: ${randomConsequence}`
        consequenceDisplay.classList.remove("hidden");
    } else{
        consequenceDisplay.textContent="Consequence not available!";
        consequenceDisplay.classList.remove("hidden")
    }
}

function hideConsequence(){
    consequenceDisplay.classList.add("hidden");
}

passPotatoButton.addEventListener("click", () => {
    console.log("Pass the potato button clicked");
    hideConsequence();
    startTimer();
});

window.onload=async function(){
    await loadConsequences();
}