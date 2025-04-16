// <
/// playgomb
import {DrawGrid,DrawUpgradeGrid,DrawReadyMark, DrawGridFirst, GridLista, canvas, ctx, DrawGridByCordsFirst,DrawGridUpgrade} from './canvas.js';
import {Player} from './player.js';
import {Grid} from './grid.js';
import {cropGenerating, Crop} from './flower.js';
const commandbar = document.getElementById('command-line');
let character =  new Player(canvas.width / 2, canvas.height / 2, 35,35);
let inventory = cropGenerating();
let listofSounds = [];
let dots = 0;

const inventoryDiv = document.getElementById("Inventory");
inventoryDiv.style.display = "None";

let Award = false;
let basicGrids = [];
let gridlist = GridLista();
let pastgrid = null;
let keyState = {
    right: false,
    left: false,
    up: false,
    down: false,
    e: false
};
const blocks = [];
const blockWidth = 40;
const blockHeight = 40;
const blockSpeed = 2;


let blockSpawnInterval = null;
let healthpoints = 3;
let ogsecs = 0;
let hasDied = 0;
let rainActive = false;

let coins = 0;
let secs = 12.5 * 6;
let hours = 0;
let days = 0;
let daytime = "day";
let Volume = 50;

let upgrade = 0;
let imgsrc = document.getElementById("coin-1");
let coinAnimation = 48;

let stopcharacter = false;

clearCookies();

function Cookies(){
    if (getCookie("Award") == "true"){
        Award = true;
    }
    else{
        setCookie("Award",Award);
    }
    if (getCookie("Health") != "" ){
        healthpoints = Number(getCookie("Health"));
    }
    else{
        setCookie("Health",healthpoints);
    }
    if (getCookie("Upgrade") != ""){
        upgrade = Number(getCookie("Upgrade"));
    }
    else{
        setCookie("Upgrade",upgrade);
    }
    if(getCookie("Volume") != ""){
        Volume = Number(getCookie("Volume"));
    }
    else{
        setCookie("Volume",Volume);
    }
    if(getCookie("Coins") != ""){
        coins = Number(getCookie("Coins"));
    }
    else{
        setCookie("Coins",coins);
    }
    if (getCookie("Seconds,Days,daytime") != "" && getCookie("Seconds,Days,daytime") != 0){
        let strings = getCookie("Seconds,Days,daytime");
        let data = strings.split('/');
        secs = Number(data[0]);
        days = Math.floor(data[1]);
        daytime = data[2];
    
        if (daytime == "dark"){
            document.getElementById("daytime-img").style.transform = "rotate(180deg)";
        }
    }
    else{
        setCookie("Seconds,Days,daytime",`${secs}/${days}/${daytime}`);
    }
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
}

/////
function digital() {
    hours = Math.floor(secs / 12.5);
    let pastDaytime = daytime;
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

    if(pastDaytime != daytime){
        if (pastDaytime == "day"){
            console.log("Sun sets..");
            document.getElementById("daytime-img").style.animation = "changeDayTime 2s";
        }
        else if(pastDaytime == "dark"){
            console.log("Sun rises..");
            document.getElementById("daytime-img").style.animation = "changeNightTime 2s";
        }
        document.getElementById("daytime-img").style.animationFillMode = "forwards";
    }

    days = secs / (12.5 * 24);
    document.getElementById("digitalclock").innerText = hours + ':' + "00";
}
window.onload = () => {
    Cookies();
    mainScreen();
    document.getElementById("play-button").addEventListener('click', () => {
        document.getElementById("play-button").style.display = "none";
        document.getElementById("play-button-clicked").style.display = "block";
       
        setTimeout(() => {
            document.getElementById("play-button-clicked").style.display = "none";
            document.getElementById("play-button").style.display = "block";
        },250);
        setTimeout(() => {
            document.getElementById("play-button").style.display = "none";
            document.getElementById("loading").style.display = "block";
            const interval = setInterval(() => {
                dots = WriteDot();
            },1000);
            setTimeout(() => {
                clearInterval(interval);
                dots = 4;
                if (dots > 3){
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("coins-amount").style.display = "block";
                    document.getElementById("digitalclock").style.display = "flex";
                    document.getElementById("daytime-img").style.display = "block";
                    document.getElementById("DayCounter").style.display = "block";
                    document.getElementById("barFrame").style.display = "block";
                    {
                        setInterval(GrowSec,1000);
                        setTimeout(startRainPhase,150000);
                    //// draw
                        DrawGridFirst(10,2,100);
                        if (Award == true){
                      
                            ctx.drawImage(document.getElementById("award"),0,canvas.height,50,50);
                        }
                        let upgrade = Number(getCookie("Upgrade"));
                        for(let j = 1; j < upgrade+1; j++){
                            console.log("meow");
                            let newGrids = DrawUpgradeGrid(10,2,100 + j*150); 
                            newGrids.forEach(grid =>{
                            gridlist.push(grid);
                        });
                        }
                    
                        DrawGridByCordsFirst(960,170,175,50);
                        basicGrids.push(new Grid(960,170,175,50));
                        DrawGridByCordsFirst(1025,660,100,50);
                        basicGrids.push(new Grid(1025,660,100,100));
                        inventoryDiv.style.display = "None";
                    //// keys
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
                    ///
                        LoopEverything();
                    }
                }
              }, 5000);
        },600)
    });
//// volume
    let VolumeSettings = document.getElementById("volumeSettings");
    document.addEventListener("keydown", () =>{
        if (listofSounds.length == 0){
            let background = document.getElementById("backgroundAudio");
            background.play();
            listofSounds.push(background);
            for(let i = 1; i < 8; i++ ){
                listofSounds.push(document.getElementById(`sound-${i}`));
            }
            listofSounds.forEach(sound => {
                sound.volume = Volume / 100;
                
            });

        }

    });
    document.addEventListener("click", () =>{
        if (listofSounds.length == 0){
            let background = document.getElementById("backgroundAudio");
            background.play();
            listofSounds.push(background);
            for(let i = 1; i < 8; i++ ){
                listofSounds.push(document.getElementById(`sound-${i}`));
            }
            listofSounds.forEach(sound => {
                sound.volume = Volume / 100;
            });
        }
    });
    VolumeSettings.addEventListener('input',() =>{
        Volume = Number(VolumeSettings.value);
        listofSounds.forEach(sound => {
            sound.volume = Volume / 100;
            
        });
    });
////

};
///// rain
function drawBlocks() {
    ctx.fillStyle = '#64a9a6';
    for (let block of blocks) {
        ctx.drawImage(document.getElementById("leaf"),block.x,block.y,blockWidth,blockHeight);
    }
}
function updateBlocks() {
    for (let block of blocks) {
        block.y += blockSpeed;

        if (
            block.x < character.x + character.width &&
            block.x + blockWidth > character.x &&
            block.y < character.y + character.height &&
            block.y + blockHeight > character.y
            && !block.hasHit
        ) {
            
            healthpoints -= 1;
            listofSounds[7].play();
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "red";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.globalAlpha = 1.0;
            block.hasHit = true;
        }
    }

    for (let i = blocks.length - 1; i >= 0; i--) {
        if (blocks[i].y > canvas.height) {
            blocks.splice(i, 1);
        }
    }
}
function spawnBlock() {
    const x = Math.random() * (canvas.width - blockWidth);
    blocks.push({ x, y: -blockHeight, hasHit: false });
}
function startRainPhase() {
    rainActive = true;
    blockSpawnInterval = setInterval(spawnBlock, 200);
    setTimeout(stopRainPhase, 15000); 
}
function stopRainPhase() {
    rainActive = false;
    clearInterval(blockSpawnInterval);
    scheduleNextRainPhase();
}
function stoprain(){
    rainActive = false;
    clearInterval(blockSpawnInterval);
    blocks.length = 0;
}
function scheduleNextRainPhase() {
    const delay = 150000;
    setTimeout(startRainPhase, delay);
}
//// Gridsystem
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
            grid.playedsound = 0;   
        }
        gridlist.push(grid);
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
    let coveredGrids = getCharactergrids();
    let grid = null;

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

    if (grid == null){
        commandbar.innerText = "";
    }
    if (pastgrid != grid){
        gridlist.forEach(grid_ => {
            grid_.viragKivalasztva = null;
        });

        inventoryDiv.style.display = "None";
    }

    pastgrid = grid;
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
function SetGridProperties(grid){  
    if (grid.bevetve === false){
        grid.bevetve = true;
        listofSounds[3].play();
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
        listofSounds[1].play();
        gridlist.forEach(item => {
            item.viragKivalasztva = null;
        });
        return grid;
    }
    else if(grid.ontozve === false && grid.virag != null){
        grid.ontozve = true;
        listofSounds[2].play();
        return grid;
    }
    else if(grid.virag != null && grid.ido < (grid.virag).ido){
        return grid;
    }
    else if(grid.virag != null && grid.ido >= (grid.virag).ido && grid.ontozve == true){
        let i = inventory.indexOf(grid.virag);
        inventory[i].amount += (grid.virag).kidobottSeed;
        inventory[i].grownamount++;
        listofSounds[6].play();
        coins += (grid.virag).ertek;
        grid.bevetve = false;
        grid.viragKivalasztva = null;
        grid.virag = null;
        grid.ontozve = false;
        grid.ido = 0;
        grid.playedsound = 0;   
        return grid;
    }
    return grid;
}
function seeProperties(currentGrid){ 
    let itemname = document.getElementById("item-name");
    itemname.innerText = "";
    if(currentGrid.bevetve === false){
        commandbar.innerText = "Press [E] to till the ground";
    }
    else if(currentGrid.viragKivalasztva === null && currentGrid.virag === null){
        commandbar.innerText = "Press [E] to choose crop";
    }
    else if(currentGrid.virag === null && currentGrid.viragKivalasztva != null){
        commandbar.innerText = "Press [E] to plant seed";
    
    }
    else if(currentGrid.virag != null && currentGrid.ontozve === false  ){
        commandbar.innerText = "Press [E] to water soil";
        itemname.innerText = currentGrid.virag.nev;
    }   
    else if(currentGrid.virag != null && currentGrid.ido < (currentGrid.virag).ido){
        commandbar.innerText = "";
        itemname.innerText = currentGrid.virag.nev;
    }
    else if(currentGrid.virag != null && currentGrid.ido >= currentGrid.virag.ido){
        commandbar.innerText = "Press [E] to harvest";
        itemname.innerText = currentGrid.virag.nev;
        if (currentGrid.playedsound == 0){
            listofSounds[5].play();
            currentGrid.playedsound++;
        }
    }
}
function seeGrid(currentGrid){
    let itemname = document.getElementById("item-name");
    itemname.innerText = "";
    if(currentGrid.StartX === 960 ){
        commandbar.innerText = "Press [E] to open Shop";
    }
    else if(currentGrid.StartX === 1025 && daytime == "dark" ){
        commandbar.innerText = "Press [E] to Sleep";
    }
}   
/// Inventory
function inventoryOpen(){
    inventoryDiv.style.display = "block";

    inventory.forEach(item => {
        document.getElementById(`amount-${item.nev}`).innerText = item.amount;
    });
}
function saveInventory(){
    let string = "";
        for(let i = 0; i < inventory.length; i++){
            string += inventory[i].nev + "-" + inventory[i].amount + "-" + inventory[i].grownamount;
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
        let grownamount = Number(item.split('-')[2]);
        setAmountByName(amount,crop_,grownamount);
    });
}
function setAmountByName(amount,cropname,grownamount){
    inventory.forEach(crop => {
        if(crop.nev === cropname){
            crop.amount = Number(amount);
            crop.grownamount = Number(grownamount)
        }
    });
}
function findCropByName(cropname){
    return inventory.find(crop => crop.nev === cropname);
}
/// Cookie
export function setCookie(cname, cvalue, exdays = 1000) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "SameSite=None; Secure" + ";path=/";
}
export function getCookie(cname) {
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

///extra functions 
function mainScreen(){
    document.getElementById("loading").style.display = "none";
    document.getElementById("coins-amount").style.display = "none";
    ctx.fillStyle = "brown";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    document.getElementById("digitalclock").style.display = "none";
    document.getElementById("daytime-img").style.display = "none";
    document.getElementById("DayCounter").style.display = "none";
    document.getElementById("barFrame").style.display = "none";
    
}


function WriteDot(){
    if (dots < 3){
        document.getElementById("loading").innerText += ".";
        dots++;
    }
    return dots;
}

function startOver(){
document.getElementById("deathScreen").style.display = "block";
hasDied++;
if (hasDied == 1){
    ogsecs = secs;
}
secs = ogsecs;
ctx.globalAlpha = 0.5;
ctx.fillStyle = "#gray";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.globalAlpha = 1.0;
stopcharacter = true;
commandbar.innerText = "";
setCookie("Inventory",0);
setCookie("Grids",0);
setCookie("Seconds,Days,daytime",0);
setCookie("Coins",0);
setCookie("Health","");
stoprain();
document.getElementById("startoverButton").addEventListener('click', () => {
    inventory = cropGenerating();
    gridlist = GridLista();
    secs = 12.5 * 6;
    days = 0;
    daytime = "day";
    coins = 0;
    stopcharacter = false;
    healthpoints = 3;
    hasDied = 0;
    character.x = canvas.width / 2;
    character.y = canvas.height / 2;
    document.getElementById("deathScreen").style.display = "None";
    setCookie("Inventory",0);
    setCookie("Grids",0);
    setCookie("Seconds,Days,daytime",0);
    setCookie("Coins",0);
    setCookie("Health","");
});

}
function openShop(){
    window.close();
    window.open('shop2.html');
}
function sleepAway(){
    if (daytime == "dark"){
        let hoursShouldAdd = 0;
        if (hours < 6){
            hoursShouldAdd = (6 - hours) ;
        } 
        else{
            hoursShouldAdd = (24 - hours) + 6;
            days++;
           
        }   
        jumpintime(hoursShouldAdd);
        healthpoints += 1;
        if (healthpoints > 3){
            healthpoints = 3;
        }
        console.log("Sleeping");
    }
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

function GrowSec(){
    gridlist.forEach(grid => {
        if (grid.ontozve == true){
            grid.ido++;
        }
    });
    secs++;
}
/// Character
function drawCharacter() {
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x,character.y,character.width,character.height);
}
function moveCharacter() {
    let originalx = character.x;
    let originaly = character.y;
    if (stopcharacter == false){
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

////
function LoopEverything(){
    let itemname = document.getElementById("item-name");
    /// canvas letörlése
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ////
    if (Award == true){
        ctx.drawImage(document.getElementById("award"),canvas.width-100,canvas.height-450,80,100);
    }
    DrawGridByGrid();
    DrawGridByCordsFirst(960,170,175,50);
    DrawGridByCordsFirst(1025,660,100,100);
    gridlist.forEach(grid => {
        DrawReadyMark(grid);
    });
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
        seeGrid(currentGrid);
    }
    else if (currentGrid == null){
        commandbar.innerText = "";
        itemname.innerText = "";
        inventoryDiv.style.display = "None";
    }

     /// mentés
     saveInventory();
     saveGrids();
     setCookie("Seconds,Days,daytime",`${secs}/${days}/${daytime}`);
     setCookie("Coins",coins);
     setCookie("Volume",Volume);
     setCookie("Award",Award);


    document.getElementById("coins-amount").innerText = coins;
 
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
                }
            });
        }

    }
    //// rain
    updateBlocks();
    drawBlocks();
  
    ////
    if(Volume == 0){
        document.getElementById("soundicon").src = "images/soundiconOff.png";
    }
    else{
        document.getElementById("soundicon").src = "images/soundicon.png";
    }
    //// Napok
    document.getElementById("days-number").innerText = Math.floor(days) + 1;
  
    if(daytime == "dark"){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#10296b";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 1.0;
    }
    if (hours == 19 || hours == 6 || hours == 20){
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "#d1640a";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 1.0;
    }

    ////
    if (healthpoints == 3){
        ctx.drawImage(document.getElementById("fullhp"),80,2,100,40);
    }    
    else if(healthpoints == 2){
        ctx.drawImage(document.getElementById("2hp"),80,2,100,40);
    }
    else if(healthpoints == 1){
        ctx.drawImage(document.getElementById("1hp"),80,2,100,40);
    }
    else if(healthpoints == 0){
        ctx.drawImage(document.getElementById("0hp"),80,2,100,40);
    }
    if (healthpoints < 1){
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#gray";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 1.0;
        startOver();
    
    ctx.drawImage(document.getElementById("0hp"),80,2,100,40);
    }
    ///Coin animation
    if (coinAnimation > 44){
    coinAnimation = 1;
    }

    if(coinAnimation % 11 == 0){
        imgsrc =  document.getElementById(`coin-${coinAnimation/11}`);  
    }
 
    ctx.drawImage(imgsrc,0,0,40,40);
    coinAnimation++;
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
function SetTime(secs_){
    secs = secs_;
}
function AddCoin(coins){
    coins += coins;
}
function clearCookies(){
    setCookie("Inventory",0);
    setCookie("Grids",0);
    setCookie("Seconds,Days,daytime",0);
    setCookie("Coins","");
    setCookie("Volume","");
    setCookie("Health","");
    setCookie("Upgrade",0);
    setCookie("Award",false);
}


