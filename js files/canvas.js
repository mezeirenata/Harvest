import {Grid} from './grid.js';
import {Player} from './player.js';


export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
export let gridLista = [];



let grid = {
    width : 50,
    height : 50
}
export function DrawAll(){
    DrawGrid
}

export function DrawGridFirst(grow, gcolumn, heightFrom){
    //grow = 12
    let alapx_ = 50;
    let alapy_ = 50;
    for(let j = 1; j < gcolumn+1;j++){
        for(let i = 1; i < grow+1; i++){
            let x = alapx_*i
            let y = heightFrom + alapy_*j;
            Draw(x,y);
            
            gridLista.push(new Grid(x,y,x+grid.width,y-grid.height));

        }
        
    }
    
    
}

export function DrawGrid(grid){
    ctx.strokeStyle = "#fff";
    let x = grid.x;
    let y = grid.y;
    ctx.moveTo(x,y);
    ctx.lineTo(x+grid.width,y);
    ctx.lineTo(x+grid.width,y-grid.height);   
    ctx.lineTo(x,y-grid.height);
    ctx.lineTo(x,y);
    if (grid.bevetve == true){
        ctx.fillStyle = "brown";
        ctx.fill();
    }
    ctx.stroke();
}
function Draw(x,y){
    ctx.strokeStyle = "#fff";
    ctx.moveTo(x,y);
    ctx.lineTo(x+grid.width,y);
    ctx.lineTo(x+grid.width,y-grid.height);   
    ctx.lineTo(x,y-grid.height);
    ctx.lineTo(x,y);
    ctx.stroke();
}

export function GridLista(){
    return gridLista;
}

