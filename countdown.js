let intervalId;
let idBar;
let width;
let txtSeconds = document.getElementById('txtSeconds');
let txtMinutes = document.getElementById('txtMinutes');
let btnStart = document.getElementById('start');
let spanSeconds = document.getElementById('seconds');
let spanMinutes = document.getElementById('minutes');
const btnStop = document.getElementById('stop');
const btnReset = document.getElementById('reset');
const internalDiv = document.getElementById("internalDiv");
let progressBar = document.getElementById("progressBar");


/******************************************************************************************************************************************
                                                                PROGRESS BAR FUNCTIONALITY
*******************************************************************************************************************************************/

function startProgressBar(){ 
    width = 0;
    idBar = setInterval(theProgressBar,((txtMinutes.value * 60) * 1000) / 100);
}

function theProgressBar(){
    width++
    progressBar.style.width = width + "%"; 
    progressBar.innerHTML = width * 1  + '%';
    //***************************************************************************** 
            //this piece of code is also valid to change the color of the progress bar

    // if( progressBar.style.width <= 50 + "%"){
    //     progressBar.style.background = "#1FE212";
    // }
    // else if( progressBar.style.width === 51 + "%"){
    //     progressBar.style.background = "#FFA500";
    // }
    // else if (progressBar.style.width > 80 + "%"){
    //     progressBar.style.background = "#FF0404";
    // }   
    //*****************************************************************************/
    let barra = progressBar.style.width;
    switch (barra) {
        case "1%":
                progressBar.style.background = "#1FE212";
            break;
        case "51%":
                progressBar.style.background = "#FFA500";
            break;
        case "80%":
                progressBar.style.background = "#FF0404";
            break;
    }
    if (width >= 100){
        clearInterval(idBar)
        progressBar.style.background = "red";
    }  
}

/******************************************************************************************************************************************
                                                                FUNCTIONS
*******************************************************************************************************************************************/
function countDown(){
    if(spanSeconds.innerText == 0 ){        
        spanSeconds.innerText = 59;
        spanMinutes.innerText--
    }
    else{
        spanSeconds.innerText--; 
    }

    if(spanSeconds.innerText < 10){
        spanSeconds.innerText = "0" + spanSeconds.innerText;
    }

    if(spanMinutes.innerText == 0 && spanSeconds.innerText == 0){
        clearInterval(intervalId);
        const bell = new Audio('Alarm-Clock.mp3');
        bell.play();
        btnStop.disabled = true;
        btnStop.classList.remove('button');
        btnStop.classList.add('disabled');
    }
}

function start(){
    intervalId = setInterval(countDown, 1000);

    btnStart.disabled = true; 
    btnStart.classList.remove('button');
    btnStart.classList.add('disabled');

    btnReset.disabled = false;
    btnReset.classList.remove('disabled');
    btnReset.classList.add('button');

    btnStop.disabled = false; 
    btnStop.classList.remove('disabled');
    btnStop.classList.add('button');   

    internalDiv.style.visibility = "hidden";

    if(progressBar.style.width == 0){
        startProgressBar(); 
    }
    else{
        idBar = setInterval(theProgressBar,((txtMinutes.value * 60) * 1000) / 100);
    }
}

function stop(){
    if(spanSeconds.innerText.length > 0){
        clearInterval(intervalId);
    }
    
    clearInterval(idBar);  
    
    btnStart.disabled = false;
    btnStart.classList.remove('disabled');
    btnStart.classList.add('button');

    btnStop.disabled = true;
    btnStop.classList.remove('button');
    btnStop.classList.add('disabled');
}

function more(){
    spanMinutes.innerText++;
    spanMinutes.innerText = txtMinutes.value;
}


txtMinutes.oninput = function(){
    if (this.value.length > 3) {
        this.value = this.value.slice(0,3); 
    }
    spanMinutes.innerText = txtMinutes.value;
}

function reset(){
    if (document.getElementById("internalDiv").className.match(/(?:^|\s)fadeIn animated(?!\S)/)) {
        document.getElementById("internalDiv").className = document.getElementById("internalDiv").className.replace(/(?:^|\s)fadeIn animated(?!\S)/g, "");
    }
    clearInterval(intervalId);
    clearInterval(idBar);
    
    width = 0;
    progressBar.style.width = 0;
    progressBar.innerHTML = 0  + '%';

    spanMinutes.innerText = txtMinutes.value; 
    spanSeconds.innerText = "00";
    btnReset.disabled = true;
    btnReset.classList.remove('button');
    btnReset.classList.add('disabled');

    btnStart.disabled = false;
    btnStart.classList.remove('disabled');
    btnStart.classList.add('button');

    internalDiv.classList.add("fadeIn", "animated");
    internalDiv.style.visibility = "visible";
    
}

function load(){
    btnReset.disabled = true;
    btnReset.classList.remove('button')
    btnReset.classList.add('disabled');

    btnStop.disabled = true;
    btnStop.classList.remove('button')
    btnStop.classList.add('disabled');

    spanMinutes.innerText = txtMinutes.value
}

window.addEventListener("load", load);
btnStart.addEventListener('click', start);
btnStop.addEventListener('click', stop);
btnReset.addEventListener('click', reset);


