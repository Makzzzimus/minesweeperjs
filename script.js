let minesLocation = [];
let timer = document.getElementById("TimeCounter");
let flagsLeft = document.getElementById("MineCounter");
let statusBar = document.getElementById("Status");
let isOpening = true;
let isGameOver = false;

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
                    for (let i=0; i<minesLocation.length; i++){
                        var mineCell = document.getElementById(String(minesLocation[i]));
                        //mineCell.innerHTML = "💣";
                    }
                    for (let i=500; i<3500; i=i+1000){
                        setTimeout(()=>{statusBar.style.color = "red";}, i);
                        setTimeout(()=>{statusBar.style.color = "black";}, i+500);
                    }
                    for (let i=0; i<minesLocation.length; i++){
                        var mineCell = document.getElementById(String(minesLocation[i]));
                        mineCell.innerHTML = "💣";
                        //setTimeout(()=>{mineCell.innerHTML = "💥";}, 250);
                    }
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
                    if (isOpening == true){
                        //let upperCell = Number(t.id) + 10, lowerCell = Number(t.id) -10, rightCell = Number(t.id) + 1, leftCell = Number(t.id) -1, upperRightCell = Number(t.id) - 9, upperLeftCell = Number(t.id) - 11, lowerRightCell = Number(t.id) + 11, lowerLeftCell = Number(t.id) + 9;
    
                    }
                }
                
                 // if ((t.id % 10) == 0){
        
                // }
            }
            //alert(t.id)
        }
    }
}
function flagCell(t){
    if(isGameOver == false){
        if (t.innerHTML ==="⠀"){
            t.innerHTML = "🚩";
            flagsLeft.innerHTML = Number(flagsLeft.innerHTML) - 1;
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
 
generateMines();
