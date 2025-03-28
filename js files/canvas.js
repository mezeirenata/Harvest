let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gridLista = [];


let grid = {
    width : 50,
    height : 50
}
export function DrawAll(grow, gcolumn){
    //grow = 12
    let alapx = 50;
    let alapy = 50;
    for(let j = 1; j < gcolumn+1;j++){
        for(let i = 1; i < grow+1; i++){
            Draw(alapx*i,alapy+alapy*j);
        }

    }

    
}
function Draw(x,y){
    ctx.strokeStyle = "#fff";
    ctx.moveTo(x,y);
    ctx.lineTo(x+grid.width,y);
    ctx.lineTo(x+grid.width,y-grid.height);   
    ctx.lineTo(x,y-grid.height);
    ctx.lineTo(x,y);
    ctx.stroke();
    /// grid példányosítás
}

export function GridLista(){
    return gridLista;
}
