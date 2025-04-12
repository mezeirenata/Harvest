import {Grid} from './grid.js';


export let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
export let gridLista = [];
const SownGround = document.getElementById("sown");
const WateredGround = document.getElementById("watered");

let grid = {
    width : 50,
    height : 50
}


export function DrawGridFirst(grow, gcolumn, heightFrom){
    let alapx_ = 50;
    let alapy_ = 50;
    for(let j = 1; j < gcolumn+1;j++){
        for(let i = 1; i < grow+1; i++){
            let x = alapx_*i
            let y = heightFrom + alapy_*j;
            Draw(x,y);
            
            gridLista.push(new Grid(x,y,50,50));

        }
        
    }
    
    
}

export function DrawGridUpgrade(grow, gcolumn, heightFrom){
    let alapx_ = 50;
    let alapy_ = 50;
    let UpgradedGrids = [];
    for(let j = 1; j < gcolumn+1;j++){
        for(let i = 1; i < grow+1; i++){
            let x = alapx_*i
            let y = heightFrom + alapy_*j;
            Draw(x,y);
            
            UpgradedGrids.push(new Grid(x,y,50,50));

        }
        
    }
    return UpgradedGrids;
    
}
export function DrawGridByCordsFirst(x,y,width,height){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.1;
    ctx.strokeRect(x,y-height,width,height);
    

}

export function DrawReadyMark(grid){
    if(grid.virag != null && grid.ido >= (grid.virag).ido && grid.ontozve === true){
        ctx.drawImage(document.getElementById("readyCrop"),grid.StartX + 10, grid.EndY -55,35,65);
    }
}

export function DrawGrid(grid){
    let x = grid.x;
    let y = grid.y;
    if (grid.bevetve === true){
        ctx.drawImage(SownGround,grid.StartX,grid.EndY);  
    }
    if (grid.virag != null  && grid.ontozve === false){
        let cropname = grid.virag.nev + "seed-img";
        ctx.drawImage(document.getElementById(cropname), grid.StartX,grid.EndY);
        
    }
    if (grid.ontozve === true){
        ctx.drawImage(WateredGround,grid.StartX,grid.EndY);  
        let cropname = grid.virag.nev + "seed-img";
        ctx.drawImage(document.getElementById(cropname), grid.StartX,grid.EndY);
    }
    if (grid.virag != null &&  grid.ido >= (grid.virag).ido && grid.ontozve === true){
        ctx.drawImage(WateredGround,grid.StartX,grid.EndY); 
        let cropname = grid.virag.nev;
        ctx.drawImage(document.getElementById(cropname+"-img"), grid.StartX,grid.EndY);
    }
    
    if (grid.kivalasztott == true){
        ctx.strokeRect(grid.StartX,grid.EndY,grid.width,grid.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#67953e";
        ctx.strokeRect(grid.StartX,grid.EndY,grid.width,grid.height);
    }

    else{
        ctx.moveTo(x,y);
        ctx.lineTo(x+grid.width,y);
        ctx.lineTo(x+grid.width,y-grid.height);   
        ctx.lineTo(x,y-grid.height);
        ctx.lineTo(x,y);
        ctx.stroke();

    }
}
function Draw(x,y){
    ctx.strokeStyle = "#67953e";
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

