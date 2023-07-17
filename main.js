let showTut = true;

function toggleTut(){
    showTut = !showTut;

    if(showTut){
        document.getElementById("overlay").style.display = "unset";
        document.getElementById("rules-popup").style.display = "unset";
    } else {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("rules-popup").style.display = "none";
    }
}

function pick(what) {
    var pBtn = document.getElementById("playerBtn");
    pBtn.className = "fightBtn " + what; 
    
    if(what === "paper"){        
        document.getElementById("pPa").style.display = "unset";
        document.getElementById("pSc").style.display = "none";
        document.getElementById("pRo").style.display = "none";
    } else if(what === "scissors") {
        document.getElementById("pSc").style.display = "unset";
        document.getElementById("pRo").style.display = "none";
        document.getElementById("pPa").style.display = "none";
    } else if(what === "rock"){
        document.getElementById("pRo").style.display = "unset";
        document.getElementById("pPa").style.display = "none";
        document.getElementById("pSc").style.display = "none";
    }

    document.getElementById("selection").style.display = "none";
    document.getElementById("versus").style.display = "flex";
    document.getElementById("enemyBtn").style.display = "none";
    document.getElementById("enemyBtnBehind").style.display = "unset";

    options = ["scissors", "rock", "paper"];
    choice = options[Math.floor(Math.random() * 3)];

    var eBtn = document.getElementById("enemyBtn");
    eBtn.className = "fightBtn " + choice; 

    document.getElementById("winOrLoose").style.display = "none";

    setTimeout(function(){
        document.getElementById("winOrLoose").style.display = "flex";
        document.getElementById("enemyBtnBehind").style.display = "none";
        eBtn.style.display = "unset";

        if(choice === "paper"){        
            document.getElementById("ePa").style.display = "unset";
            document.getElementById("eSc").style.display = "none";
            document.getElementById("eRo").style.display = "none";
        } else if(choice === "scissors") {
            document.getElementById("eSc").style.display = "unset";
            document.getElementById("eRo").style.display = "none";
            document.getElementById("ePa").style.display = "none";
        } else if(choice === "rock"){
            document.getElementById("eRo").style.display = "unset";
            document.getElementById("ePa").style.display = "none";
            document.getElementById("eSc").style.display = "none";
        }

        var txt = document.getElementById("winTxt");
        if(choice == what){
            txt.textContent = "YOU TIED!";
            txt.style.color = "yellow";
        } else if((choice === "paper" && what === "rock") || (choice === "scissors" && what === "paper") || (choice === "rock" && what === "scissors")){
            txt.textContent = "YOU LOOSE!";
            txt.style.color = "red";
            totalScore--;
        } else {
            txt.textContent = "YOU WIN!";
            txt.style.color = "lawngreen";
            totalScore++;
        }

        document.getElementById("scoreTxt").textContent = totalScore;
        eraseCookie("score");
        createCookie("score", totalScore + "", 365);
        console.log(readCookie("score") + "!");
    }, 2000);

    
}

let totalScore = 0;

function setScoreStart() {
    if(readCookie("score") === null){
        totalScore = 0;
    } else {
        totalScore = parseInt(readCookie("score"));
    }
    
    document.getElementById("scoreTxt").textContent = totalScore.toString();
    console.log(readCookie("score"));
}


function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}