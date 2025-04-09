// <
// idő -> süti, virágok, animáció, sötétedés, moon-sun
// days -> süti, kiírva
import {DrawGrid, DrawGridFirst, GridLista, canvas, ctx, DrawGridByCordsFirst} from './canvas.js';
import {Player} from './player.js';
import {Grid} from './grid.js';
import {cropGenerating, Crop} from './flower.js';
const commandbar = document.getElementById('command-line');
let character =  new Player(canvas.width / 2, canvas.height / 2, 35,35);
let inventory = cropGenerating();

const inventoryDiv = document.getElementById("Inventory");
inventoryDiv.style.display = "None";


let basicGrids = [];
let keyState = {
    right: false,
    left: false,
    up: false,
    down: false,
    e: false
};

let gridlist = GridLista();
let secs = 12.5 * 6    ; //// cookie
let hours = 0;//// cookie
let days = 0;

let pastSecs = 0;

let daytime = "day";//// -> órák alapján

/// süti : coinok,

/// ms -> onload -> betöltés, loopkor felszámolja, elmenti (napokat kiszámítja)
/// coinok -> minden virágbegyűjtéskor elmentődik (onloadnál betölt)


/// IDŐ, SHOP, ALVÁS, INVENTORY, 

/// hang plussz event coinok,sütik


/// Telik az idő
/// minden új napnál van egy másodpercszámláló

/// az elmentett új másodpercnyivel ugrik az óramutató oldal betöltésekor
setCookie("Inventory",0);
setCookie("Grids",0);

if (getCookie("Inventory") != "" && getCookie("Inventory") != 0){
    let stringofInventory = getCookie("Inventory");
    InventorySet(stringofInventory);
}
else{
    saveInventory();
}

if (getCookie("Grids") != "" && getCookie("Grids") != 0){
    gridlist = [];
    let stringofgrids = getCookie("Grids");
    GridSet(stringofgrids);
}
else{
    saveGrids();
}
function digital() {
    hours = Math.floor(secs / 12.5);

    if ((secs % 300) == 0) {
        hours = 0;
    }
    else if(secs > 300) {
        hours = 0;
        let oszto = Math.floor(secs / 300);
        let newsecs = secs - oszto * 300;
        hours = Math.floor(newsecs / 12.5);   
    }
    if (hours > 20 || hours < 6){
        daytime = "dark";
    }

    else{
        daytime = "day";
    }

    days = secs / (12.5 * 24);
    document.getElementById("digitalclock").innerText = hours + ':' + "00";
}
window.onload = () => {
    /// idő elindul ! de elmentett napnál kezdi (minden nap végén mentés) 
    setInterval(GrowSec,1000);
    ////
    DrawGridFirst(10,2,50,50);
    DrawGridByCordsFirst(960,170,175,50);
    basicGrids.push(new Grid(960,170,175,50));
    DrawGridByCordsFirst(1025,660,100,50);
    basicGrids.push(new Grid(1025,660,100,100));
    inventoryDiv.style.display = "None";

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
            commandbar.innerText = "";
            let selectedGrid = decideGrid();
            if (selectedGrid != null){
                if (selectedGrid.StartX === 960 && selectedGrid.StartY === 170){
                    openShop();
                }
                else if(selectedGrid.StartX === 1025 && selectedGrid.StartY === 660){
                    sleepAway(); 
                }
                else{
                    let gridFarm = SetGridProperties(selectedGrid);
                    let index = searchIndexByGrid(gridFarm);
                    gridlist[index] = gridFarm;
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

function chooseCropByClass(id){
    let cropnameDiv = document.querySelector(id);
    let string = cropnameDiv.id;
    let cropname = string.replace("seed","");
    let crop = findCropByName(cropname);
    return crop;
    
}

function searchIndexByGrid(grid){
    for (let i = 0; i< gridlist.length;i++ ){
        let item = gridlist[i];
        if(item.StartX === grid.StartX && item.StartY === grid.StartY){
            return i;
        }
    }
}

function saveGrids(){
    let string = "";
    for(let i = 0; i < gridlist.length; i++){

        let virag = gridlist[i].virag;
        let viragstring = "null";
        if (virag != null){
            viragstring = virag.nev + ":" + virag.ertek + ":" + virag.price + ":" + virag.ido + ":" + virag.kidobottSeed;
        
        }
        string +=  gridlist[i].StartX + ":" +  gridlist[i].StartY + ":" +  gridlist[i].width + ":" +  gridlist[i].bevetve + ":" + viragstring + ":" + gridlist[i].ontozve + ":" +  gridlist[i].ido ;
        if (i != gridlist.length-1){
            string += "|";
        }
        
        
    }
    setCookie("Grids",string);
}

function GridSet(stringofgrids){
    let gridsString = stringofgrids.split('|');
    gridsString.forEach(string => {
        let strings = string.split(":");
        let crop = new Crop(0,0,0,0,0);
        let grid = new Grid(0,0,0,0);
        grid.StartX = Number(strings[0]);
        grid.StartY = Number(strings[1]);
        grid.width = Number(strings[2]);
        grid.height = Number(strings[2]);
        grid.EndX = grid.StartX + grid.width;
        grid.EndY = grid.StartY - grid.height;
        if (strings[3] === "true"){
            grid.bevetve = true;
        }
        else{
            grid.bevetve = false;
        }
        if (strings[4] != "null"){
            crop.nev = strings[4];
            crop.ertek = Number(strings[5]);
            crop.price = Number(strings[6]);
            crop.ido = Number(strings[7]);
            crop.kidobottSeed = Number(strings[8]);
            
            grid.virag = crop;

            if (strings[9] == "true"){
                grid.ontozve = true;
            }
            else{
                grid.ontozve = false;
            }
            grid.ido = Number(strings[10]);
        }
        else{
            grid.virag = null;
            if (strings[5] == "true"){
                grid.ontozve = true;
            }
            else{
                grid.ontozve = false;
            }
            grid.ido = Number(strings[6]);
            
        }
        
        gridlist.push(grid);
    });
    
    
}

function inventoryOpen(){
    inventoryDiv.style.display = "block";

    inventory.forEach(item => {
        document.getElementById(`amount-${item.nev}`).innerText = item.amount;
    });
}


function setCookie(cname, cvalue, exdays = 1000) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "SameSite=None; Secure" + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function saveInventory(){
    let string = "";
        for(let i = 0; i < inventory.length; i++){
            string += inventory[i].nev + "-" + inventory[i].amount;
            if (i < inventory.length - 1){
                string += "/";
            }            
        }
        setCookie("Inventory",string);
        
}
function InventorySet(stringItems){

    let items = stringItems.split('/');
    items.forEach(item => {
        let crop_ = item.split('-')[0];
        let amount = Number(item.split('-')[1]);
        setAmountByName(amount,crop_);
    });
}






function setAmountByName(amount,cropname){
    inventory.forEach(crop => {
        if(crop.nev === cropname){
            crop.amount = Number(amount);
        }
    });
}

function findCropByName(cropname){
    return inventory.find(crop => crop.nev === cropname);
}

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
    let originalx = character.x;
    let originaly = character.y;
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
    if(character.x > 888 && character.y < 110) {
        character.x = originalx;
        character.y = originaly;
    }
 
}

function openShop(){
    //// sütik elmentése !!
    window.open('shop.html');
}

function jumpintime(JumpedHours){
    secs += JumpedHours * 12.5;
    if ((secs % 300) == 0) {
        hours = 0;
    }
    else if(secs > 300) {
        hours = 0;
        let oszto = Math.floor(secs / 300);
        let newsecs = secs - oszto * 300;
        hours = Math.floor(newsecs / 12.5);   
    }
}

function sleepAway(){
    if (daytime == "dark"){
        let hoursShouldAdd = 0;
        if (hours < 6){
            hoursShouldAdd = (6 - hours) ;
        } 
        else{
            console.log(hours);
            hoursShouldAdd = (24 - hours) + 6;
            console.log(hoursShouldAdd);
            days++;
        }   
        jumpintime(hoursShouldAdd);
        console.log("Sleeping");
    }
    /// csak akkor HA éjjel van már
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
    else if(grid.viragKivalasztva == null && grid.virag === null){
        inventoryOpen();
    }
    else if(grid.virag == null && grid.viragKivalasztva != null){
        inventoryDiv.style.display = "None";
        grid.virag = grid.viragKivalasztva;
        let i = inventory.indexOf(grid.viragKivalasztva);
        inventory[i].amount -= 1;
        return grid;
    }
    else if(grid.ontozve === false && grid.virag != null){
        grid.ontozve = true;
        /// itt kezdje el számolni az időt
        return grid;
    }
    else if(grid.virag != null && grid.ido === (grid.virag).ido){
        grid.bevetve = false;
        grid.viragKivalasztva = null;
        let i = inventory.indexOf(grid.virag);
        inventory[i].amount += (grid.virag).kidobottSeed;
        grid.virag = null;
        grid.ontozve = false;
        grid.ido = 0;
        // coin += virag.ertek
        return grid;
    }
    return grid;
}

function seeProperties(currentGrid){
    
    
    if(currentGrid.bevetve === false){
        commandbar.innerText = "Press [E] to cultivate ";
    }
    else if(currentGrid.viragKivalasztva === null && currentGrid.virag === null){
        commandbar.innerText = "Press [E] to choose crop";
    }
    else if(currentGrid.virag === null && currentGrid.viragKivalasztva != null){
        commandbar.innerText = "Press [E] to plant seed";
    }
    else if(currentGrid.virag != null && currentGrid.ontozve === false  ){
        commandbar.innerText = "Press [E] to water soil";
    }
    else if(currentGrid.virag != null && currentGrid.ido === currentGrid.virag.ido){
        commandbar.innerText = "Press [E] to harvest";
    }
}

function seeGrid(currentGrid){
    if(currentGrid.StartX === 960){
        commandbar.innerText = "Press [E] to open Shop";
    }
    else if(currentGrid.StartX === 1025 ){
        /// HA éjjel van
        commandbar.innerText = "Press [E] to Sleep";
    }
}
    
function GrowSec(){
    secs++;
}

function LoopEverything(){

    /// canvas letörlése
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //// minden létező grid megrajzolása    -> ide kell majd mentés szerint megjeleníteni a növényeket(?)
    DrawGridByGrid();
    DrawGridByCordsFirst(960,170,175,50);
    DrawGridByCordsFirst(1025,660,100,100);
    ///    
    digital();
    /// karakterre vonatkozó frissülő adatok
    moveCharacter();
    drawCharacter();
    
    //// aktív grid megkeresése, kijelölése
    let currentGrid = decideGrid();
    if (currentGrid != null && !basicGrids.includes(currentGrid) ){
        seeProperties(currentGrid);
    }
    else if(currentGrid != null && basicGrids.includes(currentGrid)){
        seeGrid(currentGrid)
    }
    else{
        commandbar.innerText = "";
        inventoryDiv.style.display = "None";
    }

     /// mentés
     saveInventory();
     saveGrids();
    
    
     if (inventoryDiv.style.display === "block"){
         for(let i = 1; i < 13; i++){
            document.querySelector(`.item-${i}`).addEventListener('mouseover', (e) => {
                let crop = chooseCropByClass(`.item-${i}`);
                if(crop.amount < 1){
                    document.querySelector(`.item-${i}`).style.cursor = "default";  
                }
            });
            document.querySelector(`.item-${i}`).addEventListener('click', (e) => {
                let crop = chooseCropByClass(`.item-${i}`);
                if (currentGrid != null && !basicGrids.includes(currentGrid) && crop.amount > 0){
                    currentGrid.viragKivalasztva = crop;

                }
                if(crop.amount < 1){
                    console.log(`Not enough ${crop.nev}seed!`);
                    inventoryDiv.style.display = "None";
                }
            });
        }

    }
    
     /// HA ESTE VAN:
    if(daytime == "dark"){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#10296b";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 1.0;
    }
    requestAnimationFrame(LoopEverything);
}

/// Teszt
function AddAmount(cropname,amount){
    inventory.forEach(crop => {
        if (crop.nev === cropname){
            crop.amount += amount;
        }
    });
}
/// addcoin


//DrawAll(10,2,200); -> területvétel esetén
//// Objektum inventorynak
//// Coin
//// Terület vétel -> nem rajzolja újra az egészet
//// Cookie system
