
import {DrawGrid, DrawGridFirst, GridLista, canvas, ctx, DrawGridByCordsFirst} from './canvas.js';
import {Player} from './player.js';
import {Grid} from './grid.js';

let character =  new Player(canvas.width / 2, canvas.height / 2, 35,35);
let gridlist = GridLista();
let basicGrids = [];
let keyState = {
    right: false,
    left: false,
    up: false,
    down: false
};
/// Telik az idő

window.onload = () => {
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
            ctx.strokeStyle = "#645606";
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
    console.log("sleeping...");
}

function activeGrid(){
    let pressed = false;
    basicGrids.forEach(grid => {
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
            document.addEventListener('keydown', (e) =>
            { 
                if (grid.StartX == 1015 && grid.StartY == 170)
                {
                    if (e.key === 'e'){
                        openShop();
                    }
                }
                
                
            });
          
            document.addEventListener('keydown', (e) => {
                if (grid.StartX == 1075 && grid.StartY == 625  && e.key === 'e'){
                    pressed = true;
                }
            })


//// TODO/!
            console.log(pressed);
            if (pressed == true){
                sleepAway();
            }
            
            
        }
    });
}

function drawCharacter() {
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x,character.y,character.width,character.height);
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
    /// shop megnyitás + alvás
    activeGrid();


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