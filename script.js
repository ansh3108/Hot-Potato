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
    timeLeft=Math.floor(Math.random()*6)+5;
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

