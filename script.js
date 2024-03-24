let minesLocation = [];

function openCell(t){
    let nearbyMinesCount;
    t.style.boxShadow = "inset 1.5px 1.5px 3px 1px rgba(0,0,0,0.55)"
    for (let i=0; i<10; i++){
        if (t.id == minesLocation[i]){
            alert("boom");
            t.innerHTML = "💣";
        }
    }
    if (t.innerHTML !== "💣"){
        if ((t.id % 10) == 0){

        }
    }
    //alert(t.id)
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