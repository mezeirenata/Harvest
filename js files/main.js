
import {DrawGrid, DrawGridFirst, GridLista, canvas, ctx, DrawGridByCordsFirst} from './canvas.js';
import {Player} from './player.js';
import {Grid} from './grid.js';
import {displayTime} from './tets copy.js';

let hasSlept = false;
let hasPressed = false;
let character =  new Player(canvas.width / 2, canvas.height / 2, 35,35);
let gridlist = GridLista();
let basicGrids = [];
let keyState = {
    right: false,
    left: false,
    up: false,
    down: false,
    e: false
};
/// IDŐ, SHOP, ALVÁS, INVENTORY, COMMAND BAR



/// Telik az idő
/// minden új napnál van egy másodpercszámláló

/// az elmentett új másodpercnyivel ugrik az óramutató oldal betöltésekor
/// van egy összesmásodpercszámláló -> növényekhez

window.onload = () => {
    /// idő elindul ! de elmentett napnál kezdi (minden nap végén mentés) 
    setInterval(displayTime, 1000);
    setInterval(GridTime,1000);
    ///
    DrawGridFirst(10,2,50);
    DrawGridByCordsFirst(960,120,175);
    basicGrids.push(new Grid(960,170,50));
    DrawGridByCordsFirst(1075,575,50);
    basicGrids.push(new Grid(1075,625,50));
    ////
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'd') {
            keyState.right = true;
        }
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            keyState.left = true;
        }
        if (e.key === 'ArrowUp' || e.key === 'w') {
            keyState.up = true;
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
            keyState.down = true;
        }
        
    });
    document.addEventListener('keydown', (s) => {
        if (s.key === 'e'){
            let selectedGrid = decideGrid();
            if (selectedGrid != null){
                if (selectedGrid.StartX === 960 && selectedGrid.StartY === 170){
                    openShop();
                }
                else if(selectedGrid.StartX === 1075 && selectedGrid.StartY === 625){
                    sleepAway(); 
                }
                else{
                    let gridFarm = SetGridProperties(selectedGrid);
                    gridlist.push(gridFarm);
                }
            }
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'd') {
            keyState.right = false;
        }
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            keyState.left = false;
        }
        if (e.key === 'ArrowUp' || e.key === 'w') {
            keyState.up = false;
        }
        if (e.key === 'ArrowDown' || e.key === 's') {
            keyState.down = false;
        }

    });
    LoopEverything();
};

function GridTime(){
    gridlist.forEach(grid => {
        if (grid.virag != null){
            grid.ido++;
        }
    });
}

function getCharactergrids(){
    const coveredGrids = [];


    gridlist.forEach(grid => {
      
        let overlayX = false;
        let overlayY = false;

        let bottomY = character.y+character.height;
        if (character.y <= grid.StartY && bottomY >= grid.EndY ){
            overlayY = true;
        }
        let lastX = character.x + character.width;
        if (lastX >= grid.StartX && character.x <= grid.EndX){
            overlayX = true;
        }


        if (overlayY && overlayX){
            coveredGrids.push(grid);

        }
       
    });
    return coveredGrids

}

function decideGrid(){
    let grid = null;
    let coveredGrids = getCharactergrids();

    if (coveredGrids.length > 0){
        let maxGrid = coveredGrids[0];
        let maxsize = 0;
        coveredGrids.forEach(grid => {
            let size = calculateSize(grid);
            if (size > maxsize){
                maxsize = size;
                maxGrid = grid;
            }
        });
        
        for (let i = 0; i < gridlist.length; i++){
         if (gridlist[i].StartX == maxGrid.StartX && gridlist[i].StartY == maxGrid.StartY ){
                gridlist[i].kivalasztott = true;
                grid = gridlist[i];
         }
         else{
            gridlist[i].kivalasztott = false;
         }
        }
        
    }

    else{
        for (let i = 0; i < gridlist.length; i++){
                   gridlist[i].kivalasztott = false;
           } 
    }

    basicGrids.forEach(gridBasic => {
        let overlayX = false;
        let overlayY = false;

        let bottomY = character.y+character.height;
        if (character.y <= gridBasic.StartY && bottomY >= gridBasic.EndY ){
            overlayY = true;
        }
        let lastX = character.x + character.width;
        if (lastX >= gridBasic.StartX && character.x <= gridBasic.EndX){
            overlayX = true;
        }


        if (overlayY && overlayX){
            grid = gridBasic;

        }
       
    });
    
    return grid;
}

function calculateSize(grid){
    let sumPixels = 0;

    for(let x = character.x; x < (character.x+character.width); x++){
        for(let y = character.y; y < (character.y+character.height);y++){

            for(let gridx = grid.StartX+1; gridx <= grid.EndX; gridx++){
                for(let gridy = grid.StartY-1; gridy >= grid.EndY; gridy-- ){
                    if (gridx == x && gridy == y ){
                        sumPixels++;
                    }
                }
            }

        }
        
    }

    return sumPixels;
}


function DrawGridByGrid(){
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#67953e";
    gridlist.forEach(grid => {
        if(grid.kivalasztott == true){
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#9dd1e7";
        }
        DrawGrid(grid);
    });
}

function moveCharacter() {
    if (keyState.right) {
        character.x += 5;
    }
    if (keyState.left) {
        character.x -= 5;
    }
    if (keyState.up) {
        character.y -= 5;
    }
    if (keyState.down) {
        character.y += 5;
    }
    
    if (character.x < 0) character.x = 0;
    if (character.y < 0) character.y = 0;
    if (character.x + character.width > canvas.width) character.x = canvas.width - character.width;
    if (character.y + character.height > canvas.height) character.y = canvas.height - character.height;
}

function openShop(){
    //// sütik elmentése !!
    window.open('shop.html');
}

function sleepAway(){
    // idő ugrik, annyit hogy reggelre egészüljön ki az eltelt másodpercek, óraugrik
    // napszámláló nől
    console.log("Sleeping");
}





function drawCharacter() {
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x,character.y,character.width,character.height);
}

function SetGridProperties(grid){
    if (grid.bevetve == false){
        grid.bevetve = true;
        return grid;
    }
    else if(grid.ontozve === false){
        grid.ontozve = true;
        return grid;
    }
    else if(grid.virag == null){
        // nyíljon meg az inv, clickel döntsön virágot, azt a virágot kapja a grid
        grid.ido = 0;
        return grid;
    }
    else if(grid.ido === grid.virag.ido){
        grid.bevetve = false;
        grid.virag = null;
        grid.ontozve = false;
        grid.ido = 0;
        // coin += virag.ertek
        return grid;
    }
}

    
    


function LoopEverything(){

    /// canvas letörlése

    ctx.clearRect(0,0,canvas.width,canvas.height);
    //// minden létező grid megrajzolása    -> ide kell majd mentés szerint megjeleníteni a növényeket(?)
    DrawGridByGrid();
    DrawGridByCordsFirst(960,120,175);
    DrawGridByCordsFirst(1075,575,50);
    
    /// karakterre vonatkozó frissülő adatok
    moveCharacter();
    drawCharacter();
    
    //// aktív grid megkeresése, kijelölése
    decideGrid();
    //// TODO: NE JELÖLJÖN KI TÖBBET EGYSZERRE

    /// shop megnyitás + alvás
    if (hasSlept == true){
        sleepAway();
        hasSlept = false;
    }
    
    // if(hasPressed == true){
       
    //     let newGrid = SetGridProperties(selectedGrid);
    //     console.log(hasPressed);
    //         hasPressed = false;

    //     for(let i = 0; i < gridlist.length; i++){
    //         if (gridlist[i].StartX == newGrid.StartX && gridlist[i].StartY == newGrid.StartY){
    //             gridlist[i] = newGrid;
    //         }
    //     }
    // }
    ////
    /// Loop
    requestAnimationFrame(LoopEverything);
}

/// Ha két gridben van rajta, nézze meg hogy melyikben van nagyobb része // randomizál
/// keretezze ki

/// 2 grid
//DrawAll(10,2,200); -> területvétel esetén
//// Objektum inventorynak
//// Coin
//// Terület vétel -> nem rajzolja újra az egészet
//// Cookie system
/// Event listener (E) + kiírás 