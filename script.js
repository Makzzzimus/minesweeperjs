let minesLocation = [];
let flagsLeft = document.getElementById("MineCounter");
let statusBar = document.getElementById("Status");
let timer = document.getElementById("TimeCounter");
let isOpening = true;
let isGameOver = false;
let openingEnabled = true;
let stopwatch = setInterval(()=>{timer.innerHTML = Number(timer.innerHTML)+1;}, 1000);
const OPENED_CELL_COLOR = "rgb(225, 225, 255)";

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

function isOpeningEnabledSwitch(t){
    if (t.checked == false){
        openingEnabled = false;
    }
    else{
        openingEnabled = true;
    }
}
function isAnimationsEnabledSwitch(t){
    if (t.checked == false){
        for(i=1; 100; i++){
            let cell = document.getElementById(String(i));
            cell.style.transition = "none 0.3s";
        }
    }
    else{
        for(i=1; 100; i++){
            let cell = document.getElementById(String(i));
            cell.style.transition = "all 0.3s";
        }
    }
}
function openCell(t){
    //alert(t.id[1])
    if (isGameOver == false){
        let nearbyMinesCount = 0;
        let onLeftCorner = false;
        let onRightCorner = false;
        if (t.innerHTML !== "🚩"){
            t.style.boxShadow = "inset 1.5px 1.5px 3px 1px rgba(0,0,0,0.55)";
            t.style.background = OPENED_CELL_COLOR;
            for (let i=0; i<10; i++){
                if (t.id == minesLocation[i]){
                    isGameOver = true;
                    t.innerHTML = "💣";
                    statusBar.innerHTML = "Game Over!"
                    for (let i=500; i<3500; i=i+1000){
                        setTimeout(()=>{statusBar.style.color = "red";}, i);
                        setTimeout(()=>{statusBar.style.color = "black";}, i+500);
                    }
                    for (let i=0; i<minesLocation.length; i++){
                        var mineCell = document.getElementById(String(minesLocation[i]));
                        mineCell.innerHTML = "💣";
                        //setTimeout(()=>{mineCell.innerHTML = "💥";}, 250);
                    }
                    clearInterval(stopwatch);
                }
            }
            if (t.innerHTML !== "💣"){
                if (t.id[1] === "0"){ //Is on Right corner
                    onRightCorner = true;
                }
                if (t.id[1] === "1"){ //Is on Left corner
                    onLeftCorner = true;
                }
                else if(t.id[1]=== undefined){ //Is on Left corner(exception for first raw)
                    if(t.id[0]==="1"){
                        onLeftCorner = true;
                    }
                }
                if (onRightCorner == false){
                    for (let i=0; i<10; i++){
                        if (Number(t.id) + 1 == minesLocation[i]){ //Right Cell
                            nearbyMinesCount++;
                        }
                    }
                    for (let i=0; i<10; i++){
                        if (Number(t.id) - 9 == minesLocation[i]){ // Upper Right Cell
                            nearbyMinesCount++;
                        }
                    }
                    for (let i=0; i<10; i++){
                        if (Number(t.id) + 11 == minesLocation[i]){ //Lower Right Cell
                            nearbyMinesCount++;
                        }
                    }
                }
                if(onLeftCorner == false){
                    for (let i=0; i<10; i++){
                        if (Number(t.id) - 1 == minesLocation[i]){ //Left Cell
                            nearbyMinesCount++;
                        }
                    }
                    for (let i=0; i<10; i++){
                        if (Number(t.id) - 11 == minesLocation[i]){ //Upper Left Cell
                            nearbyMinesCount++;
                        }
                    }
                    
                    for (let i=0; i<10; i++){
                        if (Number(t.id) + 9 == minesLocation[i]){ //Lower Left Cell
                            nearbyMinesCount++;
                        }
                    }
                }
    
                for (let i=0; i<10; i++){
                    if (Number(t.id) + 10 == minesLocation[i]){ //Lower Cell
                        nearbyMinesCount++;
                    }
                }
                for (let i=0; i<10; i++){
                    if (Number(t.id) - 10 == minesLocation[i]){ //Upper Cell
                        nearbyMinesCount++;
                    }
                }
        
                
                if (nearbyMinesCount !== 0){
                    t.innerHTML = nearbyMinesCount;
                }
                if (nearbyMinesCount === 0){
                    if (openingEnabled == true){
                        opening(t);
                    }
                }
            }
        }
    }
}
function flagCell(t){
    if(isGameOver == false){
        if (t.innerHTML === "⠀" && t.style.background !== OPENED_CELL_COLOR){
            t.innerHTML = "🚩";
            flagsLeft.innerHTML = Number(flagsLeft.innerHTML) - 1;
            if (Number(flagsLeft.innerHTML)==0){
                var correctFlaggedQuantity=0;
                for (i=0; i<minesLocation.length; i++){
                    var mineCell = document.getElementById(String(minesLocation[i]));
                    if (mineCell.innerHTML === "🚩"){
                        correctFlaggedQuantity++;
                    }
                }
                if(correctFlaggedQuantity==10){
                    statusBar.innerHTML = "You Won!";
                    isGameOver = true;
                    clearInterval(stopwatch);
                    for (let i=500; i<3500; i=i+1000){
                        setTimeout(()=>{statusBar.style.color = "green";}, i);
                        setTimeout(()=>{statusBar.style.color = "black";}, i+500);
                    }
                }
            }
        }
        else if(t.innerHTML === "🚩"){
            t.innerHTML = "⠀";
            flagsLeft.innerHTML = Number(flagsLeft.innerHTML) + 1;
        }
    }
}

function generateMines(){
    let temp;
    for (let i=0; i<10; i++){
        temp = Math.round((Math.random() * 100)+1)
        for (let i=0; i<10; i++){
            if (temp == minesLocation[i]){
                location.reload();
            }
        }
        minesLocation.push(temp);
    }
    //alert(minesLocation);
}

function opening(t){
    let emptyCellsArray = [];
    let tempCell = t;
    
    try{console.log(tempCell.id);}catch{}
    let onLeftBoundary = false;
    let onRightBoundary = false;
    // let onUpperBoundary = true;
    // let onLowerBoundary = true;

    let upperCell = Number(tempCell.id) + 10, lowerCell = Number(tempCell.id) -10, rightCell = Number(tempCell.id) + 1, leftCell = Number(tempCell.id) -1, upperRightCell = Number(tempCell.id) - 9, upperLeftCell = Number(tempCell.id) - 11, lowerRightCell = Number(tempCell.id) + 11, lowerLeftCell = Number(tempCell.id) + 9;
    if (tempCell !== null && tempCell !== undefined){
        if (tempCell.id[1] === "0"){ //Is on Right corner
            onRightBoundary = true;
        }
        if (tempCell.id[1] === "1"){ //Is on Left corner
            onLeftBoundary = true;
        }
        else if(tempCell.id[1]=== undefined){ //Is on Left corner(exception for first raw)
            if(tempCell.id[0]==="1"){
                onLeftBoundary = true;
            }
        }
        try{
            //let upperCell = Number(tempCell.id) + 10;
            if ((document.getElementById(upperCell).innerHTML === "⠀" || document.getElementById(upperCell).innerHTML === "🚩") && document.getElementById(upperCell).style.background !== OPENED_CELL_COLOR){
                tempCell = document.getElementById(upperCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            //let lowerCell = Number(tempCell.id) -10;
            if ((document.getElementById(lowerCell).innerHTML === "⠀" || document.getElementById(lowerCell).innerHTML === "🚩") && document.getElementById(lowerCell).style.background !== OPENED_CELL_COLOR){
                tempCell = document.getElementById(lowerCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        if(onLeftBoundary == false){
            try{
                //let leftCell = Number(tempCell.id) -1;
                if ((document.getElementById(leftCell).innerHTML === "⠀" || document.getElementById(leftCell).innerHTML === "🚩") && document.getElementById(leftCell).style.background !== OPENED_CELL_COLOR){
                    tempCell = document.getElementById(leftCell);
                    if (checkSurroundingCells(tempCell) === true){
                        emptyCellsArray.push(tempCell);
                    }
                }
            }catch{}
            try{
                //let upperLeftCell = Number(tempCell.id) - 11;
                if ((document.getElementById(upperLeftCell).innerHTML === "⠀" || document.getElementById(upperLeftCell).innerHTML === "🚩") && document.getElementById(upperLeftCell).style.background !== OPENED_CELL_COLOR){
                    tempCell = document.getElementById(upperLeftCell);
                    if (checkSurroundingCells(tempCell) === true){
                        emptyCellsArray.push(tempCell);
                    }
                }
            }catch{}
            try{
                //let lowerLeftCell = Number(tempCell.id) + 9;
                if ((document.getElementById(lowerLeftCell).innerHTML === "⠀" || document.getElementById(lowerLeftCell).innerHTML === "🚩") && document.getElementById(lowerLeftCell).style.background !== OPENED_CELL_COLOR){
                    tempCell = document.getElementById(lowerLeftCell);
                    if (checkSurroundingCells(tempCell) === true){
                        emptyCellsArray.push(tempCell);
                    }
                }
            }catch{}
        }
        if (onRightBoundary == false){
            try{
                //let rightCell = Number(tempCell.id) + 1;
                if ((document.getElementById(rightCell).innerHTML === "⠀" || document.getElementById(rightCell).innerHTML === "🚩") && document.getElementById(rightCell).style.background !== OPENED_CELL_COLOR){
                    tempCell = document.getElementById(rightCell);
                    if (checkSurroundingCells(tempCell) === true){
                        emptyCellsArray.push(tempCell);
                    }
                }
            }catch{}
            try{
                //let lowerRightCell = Number(tempCell.id) + 11;
                if ((document.getElementById(lowerRightCell).innerHTML === "⠀" || document.getElementById(lowerRightCell).innerHTML === "🚩") && document.getElementById(lowerRightCell).style.background !== OPENED_CELL_COLOR){
                    tempCell = document.getElementById(lowerRightCell);
                    if (checkSurroundingCells(tempCell) === true){
                        emptyCellsArray.push(tempCell);
                    }
                }
            }catch{}
            
            try{
                //let upperRightCell = Number(tempCell.id) - 9;
                if ((document.getElementById(upperRightCell).innerHTML === "⠀" || document.getElementById(upperRightCell).innerHTML === "🚩") && document.getElementById(upperRightCell).style.background !== OPENED_CELL_COLOR){
                    tempCell = document.getElementById(upperRightCell);
                    if (checkSurroundingCells(tempCell) === true){
                        emptyCellsArray.push(tempCell);
                    }
                }
            }catch{}
        }
        for (let i=0; emptyCellsArray.length; i++){
            opening(emptyCellsArray[i]);
        }
    }
}

function checkSurroundingCells(tempCell){
    let nearbyMinesCount = 0;
    let upperCell = Number(tempCell.id) + 10, lowerCell = Number(tempCell.id) -10, rightCell = Number(tempCell.id) + 1, leftCell = Number(tempCell.id) -1, upperRightCell = Number(tempCell.id) - 9, upperLeftCell = Number(tempCell.id) - 11, lowerRightCell = Number(tempCell.id) + 11, lowerLeftCell = Number(tempCell.id) + 9;
    let onLeftBoundary = false;
    let onRightBoundary = false;

    if (tempCell.id[1] === "0"){ //Is on Right corner
        onRightBoundary = true;
    }
    if (tempCell.id[1] === "1"){ //Is on Left corner
        onLeftBoundary = true;
    }
    else if(tempCell.id[1]=== undefined){ //Is on Left corner(exception for first raw)
        if(tempCell.id[0]==="1"){
            onLeftBoundary = true;
        }
    }
    console.log(tempCell.id + " Cell")
    console.log(onLeftBoundary+ " left bound");
    console.log(onRightBoundary+ " right bound");

    for (let i=0; i<10; i++){
        if (upperCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (lowerCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (onLeftBoundary == false){
            if (leftCell == minesLocation[i]){
                nearbyMinesCount++;
            }
            if (upperLeftCell == minesLocation[i]){
                nearbyMinesCount++;
            }
            if (lowerLeftCell == minesLocation[i]){
                nearbyMinesCount++;
            }
        }
        if (onRightBoundary == false){
            if (rightCell == minesLocation[i]){
                nearbyMinesCount++;
            }
            
            if (upperRightCell == minesLocation[i]){
                nearbyMinesCount++;
            }
            
            if (lowerRightCell == minesLocation[i]){
                nearbyMinesCount++;
            }
        }
        
    }
    tempCell.style.boxShadow = "inset 1.5px 1.5px 3px 1px rgba(0,0,0,0.55)";
    tempCell.style.background = OPENED_CELL_COLOR;
    if(tempCell.innerHTML === "🚩"){
        flagsLeft.innerHTML = Number(flagsLeft.innerHTML) + 1;
        tempCell.innerHTML = "⠀";
    }
    if (nearbyMinesCount !== 0){
        tempCell.innerHTML = nearbyMinesCount;
    }
    if (nearbyMinesCount === 0){
        
        return true;
    }
}

generateMines();