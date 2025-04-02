
import {DrawAll, DrawGrid, DrawGridFirst, GridLista, canvas, ctx} from './canvas.js';
import {Player} from './player.js';
import {Grid} from './grid.js';

let character =  new Player(canvas.width / 2, canvas.height / 2, 35,35);
let gridlist = GridLista();
let keyState = {
    right: false,
    left: false,
    up: false,
    down: false
};
/// Telik az idő
window.onload = () => {
    // DrawGridFirst(10,2,50);
    DrawGridFirst(1,1,50);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            keyState.right = true;
        }
        if (e.key === 'ArrowLeft') {
            keyState.left = true;
        }
        if (e.key === 'ArrowUp') {
            keyState.up = true;
        }
        if (e.key === 'ArrowDown') {
            keyState.down = true;
        }
        /// valami történik, újra tölti a grideket a listába
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') {
            keyState.right = false;
        }
        if (e.key === 'ArrowLeft') {
            keyState.left = false;
        }
        if (e.key === 'ArrowUp') {
            keyState.up = false;
        }
        if (e.key === 'ArrowDown') {
            keyState.down = false;
        }
    });
    LoopEverything();
};

function getCharactergrids(){
    const coveredGrids = [];


    gridlist.forEach(grid => {
      
        let overlayX = true;
        let overlayY = false;

        if (((character.y - character.height) - grid.EndY)< character.height && character.y <= grid.StartY){
            overlayY = true;

        }
        // if(character.y >= grid.EndY && (character.y - character.height) < grid.StartY){
        //     overlayY = true;
   
        // }
        if (overlayY && overlayX){
            coveredGrids.push(grid);

        }
       
    });
    console.log(coveredGrids);
    return coveredGrids;

}


function DrawGridByGrid(){
    gridlist.forEach(grid => {
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

function drawCharacter() {
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x,character.y,character.width,character.height);
    
    
}


function LoopEverything(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    DrawGridByGrid();
    moveCharacter();
    drawCharacter();
    getCharactergrids();
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