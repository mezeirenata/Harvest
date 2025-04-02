
import {DrawAll, DrawGrid, DrawGridFirst, GridLista, canvas, ctx} from './canvas.js';
import {Player} from './player.js';
import {Grid} from './grid.js';

let player =  new Player(canvas.width / 2, canvas.height / 2);
let gridlist = GridLista();
/// Telik az idő
window.onload = () => {
    DrawGridFirst(10,2,50);
    LoopEverything();
};


function moveCharacter(){

    drawCharacter
}


function LoopEverything(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    DrawGridByGrid();
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            moveCharacter("right");
        }
        if (e.key === 'ArrowLeft') {
            moveCharacter("left");
        }
        if (e.key === 'ArrowUp') {
            moveCharacter("up");
        }
        if (e.key === 'ArrowDown') {
            moveCharacter("down");
        }
        /// valami történik, újra tölti a grideket a listába
    });
    requestAnimationFrame(LoopEverything);
}

function DrawGridByGrid(){
    gridlist.forEach(grid => {
        DrawGrid(grid);
    });
}


function drawCharacter(){

}

//requestAnimationFrame();

//DrawAll(10,2,200); -> területvétel esetén


//// Objektum inventorynak
//// Coin
//// Terület vétel -> nem rajzolja újra az egészet
//// Cookie system
//// Rajzol loop
//// Movement
//// Player -> osztály, x , y
//// Grid osztály
/// Event listener (E) + kiírás