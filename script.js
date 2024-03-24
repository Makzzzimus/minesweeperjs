let minesLocation = [];
let flagsLeft = document.getElementById("MineCounter");
let statusBar = document.getElementById("Status");
let timer = document.getElementById("TimeCounter");
let isOpening = true;
let isGameOver = false;
let stopwatch = setInterval(()=>{timer.innerHTML = Number(timer.innerHTML)+1;}, 1000);

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

function openCell(t){
    //alert(t.id[1])
    if (isGameOver == false){
        let nearbyMinesCount = 0;
        let onLeftCorner = false;
        let onRightCorner = false;
        if (t.innerHTML !== "🚩"){
            t.style.boxShadow = "inset 1.5px 1.5px 3px 1px rgba(0,0,0,0.55)";
            t.style.background = "rgb(225, 225, 255)";
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
                    opening(t);
                }
            }
        }
    }
}
function flagCell(t){
    if(isGameOver == false){
        if (t.innerHTML ==="⠀"){
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
    
    console.log(tempCell.id);
    //let onLeftBoundary = false;
    //let onRightBoundary = false;
    // let onUpperBoundary = true;
    // let onLowerBoundary = true;
    let upperCell = Number(tempCell.id) + 10, lowerCell = Number(tempCell.id) -10, rightCell = Number(tempCell.id) + 1, leftCell = Number(tempCell.id) -1, upperRightCell = Number(tempCell.id) - 9, upperLeftCell = Number(tempCell.id) - 11, lowerRightCell = Number(tempCell.id) + 11, lowerLeftCell = Number(tempCell.id) + 9;

    if (tempCell !== null && tempCell !== undefined){
        
    //       if ((Number(tempCell.id[1]) - 10) > 0){ //Is not on Upper Boundary
    //         if (document.getElementById(upperCell).innerHTML === "⠀" && document.getElementById(upperCell).style.background !== "rgb(225, 225, 255)"){
    //             tempCell = document.getElementById(upperCell);
    //             if (checkSurroundingCells(tempCell) === true){
    //                 emptyCellsArray.push(tempCell);
    //             }
    //         }
    //         onUpperBoundary = false;
    //     }
    //     if ((Number(tempCell.id[1]) + 10) < 101){ //Is not on Lower Boundary
    //         if (document.getElementById(lowerCell).innerHTML === "⠀" && document.getElementById(lowerCell).style.background !== "rgb(225, 225, 255)"){
    //             tempCell = document.getElementById(lowerCell);
    //             if (checkSurroundingCells(tempCell) === true){
    //                 emptyCellsArray.push(tempCell);
    //             }
    //         }
    //         onLowerBoundary = false;
    //     }

    //     if (tempCell.id[1] !== "0"){ //Is not on Right Boundary
    //         if (document.getElementById(rightCell).innerHTML === "⠀" && document.getElementById(rightCell).style.background !== "rgb(225, 225, 255)"){
    //             tempCell = document.getElementById(rightCell);
    //             if (checkSurroundingCells(tempCell) === true){
    //                 emptyCellsArray.push(tempCell);
    //             }
    //             if (onUpperBoundary == false){
    //                 if (document.getElementById(upperRightCell).innerHTML === "⠀" && document.getElementById(upperRightCell).style.background !== "rgb(225, 225, 255)"){
    //                     tempCell = document.getElementById(upperRightCell);
    //                     if (checkSurroundingCells(tempCell) === true){
    //                         emptyCellsArray.push(tempCell);
    //                     }
    //                 }
    //             }
    //             if (onLowerBoundary == false){
    //                 if (document.getElementById(lowerRightCell).innerHTML === "⠀" && document.getElementById(lowerRightCell).style.background !== "rgb(225, 225, 255)"){
    //                     tempCell = document.getElementById(lowerRightCell);
    //                     if (checkSurroundingCells(tempCell) === true){
    //                         emptyCellsArray.push(tempCell);
    //                     }
    //                 }
    //             }
    //         }

    //     }
    //     if (tempCell.id[1] !== "1"){ //Is not on Left Boundary
    //         if (document.getElementById(leftCell).innerHTML === "⠀" && document.getElementById(leftCell).style.background !== "rgb(225, 225, 255)"){
    //             tempCell = document.getElementById(leftCell);
    //             if (checkSurroundingCells(tempCell) === true){
    //                 emptyCellsArray.push(tempCell);
    //             }
    //             if (onUpperBoundary == false){
    //                 if (document.getElementById(upperLeftCell).innerHTML === "⠀" && document.getElementById(upperLeftCell).style.background !== "rgb(225, 225, 255)"){
    //                     tempCell = document.getElementById(upperLeftCell);
    //                     if (checkSurroundingCells(tempCell) === true){
    //                         emptyCellsArray.push(tempCell);
    //                     }
    //                 }
    //             }
    //             if (onLowerBoundary == false){
    //                 if (document.getElementById(lowerLeftCell).innerHTML === "⠀" && document.getElementById(lowerLeftCell).style.background !== "rgb(225, 225, 255)"){
    //                     tempCell = document.getElementById(lowerLeftCell);
    //                     if (checkSurroundingCells(tempCell) === true){
    //                         emptyCellsArray.push(tempCell);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     else if(tempCell.id[1]=== undefined){ //Is not on Left Boundary(exception for first raw)
    //         if(tempCell.id[0]==="1"){
    //             if (document.getElementById(leftCell).innerHTML === "⠀" && document.getElementById(leftCell).style.background !== "rgb(225, 225, 255)"){
    //                 tempCell = document.getElementById(leftCell);
    //                 if (checkSurroundingCells(tempCell) === true){
    //                     emptyCellsArray.push(tempCell);
    //                 }
    //             }
    //             if (onUpperBoundary == false){
    //                 if (document.getElementById(upperLeftCell).innerHTML === "⠀" && document.getElementById(upperLeftCell).style.background !== "rgb(225, 225, 255)"){
    //                     tempCell = document.getElementById(upperLeftCell);
    //                     if (checkSurroundingCells(tempCell) === true){
    //                         emptyCellsArray.push(tempCell);
    //                     }
    //                 }
    //             }
    //             if (onLowerBoundary == false){
    //                 if (document.getElementById(lowerLeftCell).innerHTML === "⠀" && document.getElementById(lowerLeftCell).style.background !== "rgb(225, 225, 255)"){
    //                     tempCell = document.getElementById(lowerLeftCell);
    //                     if (checkSurroundingCells(tempCell) === true){
    //                         emptyCellsArray.push(tempCell);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //           Doesn't work for some reason, and im too lazy to get it working
        
        try{
            if (document.getElementById(upperCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(upperCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(lowerCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(lowerCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(leftCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(leftCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(rightCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(rightCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(lowerRightCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(lowerRightCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(upperLeftCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(upperLeftCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(upperRightCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(upperRightCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        try{
            if (document.getElementById(lowerLeftCell).style.background !== "rgb(225, 225, 255)"){
                tempCell = document.getElementById(lowerLeftCell);
                if (checkSurroundingCells(tempCell) === true){
                    emptyCellsArray.push(tempCell);
                }
            }
        }catch{}
        
        for (let i=0; emptyCellsArray.length; i++){
            opening(emptyCellsArray[i]);
        }
    }
}

function checkSurroundingCells(tempCell){
    let nearbyMinesCount = 0;
    let upperCell = Number(tempCell.id) + 10, lowerCell = Number(tempCell.id) -10, rightCell = Number(tempCell.id) + 1, leftCell = Number(tempCell.id) -1, upperRightCell = Number(tempCell.id) - 9, upperLeftCell = Number(tempCell.id) - 11, lowerRightCell = Number(tempCell.id) + 11, lowerLeftCell = Number(tempCell.id) + 9;

    for (let i=0; i<10; i++){
        if (upperCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (lowerCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (leftCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (rightCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (upperLeftCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (upperRightCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (lowerLeftCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        if (lowerRightCell == minesLocation[i]){
            nearbyMinesCount++;
        }
        
    }
    tempCell.style.boxShadow = "inset 1.5px 1.5px 3px 1px rgba(0,0,0,0.55)";
    tempCell.style.background = "rgb(225, 225, 255)";
    if (nearbyMinesCount !== 0 && tempCell.innerHTML !== null){
        tempCell.innerHTML = nearbyMinesCount;
    }
    if (nearbyMinesCount === 0){
        return true;
    }
}

generateMines();