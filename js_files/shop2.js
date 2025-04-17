import {Crop,cropGenerating} from './flower.js';
let inventoryDiv = document.getElementById("Inventory"); 
let InventoryString = getCookie("Inventory");
let inventory = cropGenerating();
InventorySet(InventoryString);
let coins = Number(getCookie("Coins"));
let coinanimation = 0;
let imgsrc = document.getElementById("coin-1");

let upgrade = Number(getCookie("Upgrade"));
let upgrade1 = document.getElementById("button-Upgrade-1");
let upgrade2 = document.getElementById("button-Upgrade-2");

let hasPressed = false;
let Award = false;

setCookie("Visitedshop", true);

if (getCookie("Award") == "true"){
    Award = true;
}
else{
    setCookie("Award",Award);
}

function chooseCropByClass(id){
    let cropnameDiv = document.querySelector(id);
    let string = cropnameDiv.id;
    let cropname = string.replace("button-","");
    let crop = findCropByName(cropname);
    return crop;
    
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

function setAmountByName(amount,cropname,grownamount){
    inventory.forEach(crop => {
        if(crop.nev === cropname){
            crop.amount = Number(amount);
            crop.grownamount = Number(grownamount)
        }
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
function findCropByName(cropname){
    return inventory.find(crop => crop.nev === cropname);
}
function RefreshInv(){
    for(let i = 1; i < inventory.length+1; i++){
        let item = inventory[i-1];
        document.getElementById(`amount-${item.nev}`).innerText = item.amount;   
        document.querySelector(`.button-${i}`).innerHTML = item.price + `<img class="coin-img" src="images/coin1.png"> </img>`;
    }
}

function neededItems(){
    let items = [];
    inventory.forEach(item =>{
        if (item.grownamount == 0){
            items.push(item);
        }
    });
    return items;
}

window.onload = () => {
    let neededItems_ = neededItems();
    RefreshInv();

        for(let i = 1; i < 13; i++){
            let crop = chooseCropByClass(`.button-${i}`);
            if (coins < crop.price){
                document.querySelector(`.button-${i}`).style.cursor = "not-allowed";
                document.querySelector(`.item-${i}`).style.backgroundColor = "#C0C0C0";
                document.querySelector(`.item-${i}`).style.border = "2px solid gray";
            }
            else{
                document.querySelector(`.button-${i}`).style.cursor = "pointer";
            }
           document.querySelector(`.button-${i}`).addEventListener('click', (e) => {
               let crop = chooseCropByClass(`.button-${i}`);
                if(coins >= crop.price){
                    coins -= crop.price;
                    crop.amount++;
                    console.log("Successful purchase!");
                }
                else{
                    console.log("Not enough coins!");

                }
           });
       }
       
       if (upgrade > 0){
            upgrade1.style.display = "none";
            document.getElementById("Owned-1").style.display = "block";
       }
       if (upgrade == 2){
        upgrade2.style.display = "none";
        document.getElementById("Owned-2").style.display = "block";
       }
       if (Award == true){
        document.getElementById("Unlock-button").style.display = "none";
        document.getElementById("Owned-3").style.display = "block";
       }
       upgrade1.addEventListener('click', () => {
            if (coins >= 1000){
                coins -= 1000;
                upgrade = 1;
                console.log("Successful purchase!");
            }
            else{
                console.log("Not enough coins!");
            }
       });
       upgrade1.addEventListener('mouseover', () =>{
        if (coins >= 1000){
            upgrade1.style.cursor = "pointer"; 
            
        }
        else{
            upgrade1.style.cursor = "not-allowed";
        }
       });
       upgrade2.addEventListener('mouseover', () =>{
        if (coins >= 4000){
            upgrade2.style.cursor = "pointer"; 
            
        }
        else{
            upgrade2.style.cursor = "not-allowed";
        }
       });
       upgrade2.addEventListener('click', () => {
        if (coins >= 4000){
            coins -= 4000;
            upgrade = 2;
            console.log("Successful purchase!");
        }
        else{
            console.log("Not enough coins!");
        }
   });
        let unlock_ = document.getElementById("Unlock-button");
        unlock_.addEventListener('mouseover', () => {
            if (neededItems_.length == 0){
                unlock_.style.cursor = "pointer";
            }
            else{
                unlock_.style.cursor = "not-allowed";

                document.getElementById("command-line").style.display = "block";
                document.getElementById("barFrame").style.display = "block";
                document.getElementById("command-line").innerHTML = `Press [E] to check needed items!`;
            }
            
        });
      
            /// onclick
            /// ha üres oké, sikeres vétel, console.log, mentse el sütiben
        unlock_.addEventListener('mouseout',() => {
            document.getElementById("barFrame").style.display = "none";
            document.getElementById("command-line").style.display = "none";
        });
        document.addEventListener('keydown', (e) =>{
            if (e.key === 'e'){
                if (neededItems().length > 0 && hasPressed == false && document.getElementById("barFrame").style.display == "block"){
                    hasPressed = true;
                }
            }
        });
        unlock_.addEventListener('click', () => {
            if (neededItems().length == 0){
                Award = true;
                document.getElementById("Unlock-button").style.display = "none";
                document.getElementById("Owned-3").style.display = "block";
            }
        });

    document.getElementById("xbutton").addEventListener('click',() =>{
        saveInventory();
        setCookie("Coins");
        window.close();
        window.open('index.html');
    });


    LoopCycle();
};

function LoopCycle(){
    
    if(hasPressed == true){
          let strings = "You need the following plants: \n";
        for(let i = 0; i < neededItems().length; i++){
            let item = neededItems()[i];
            let string = ` 1 - ${item.nev}`; 
            if (i != neededItems().length -1){
                string += "\n";
            }
            strings += string;
        }
        alert(strings);
        hasPressed = false; 
    }
    coinanimation++;
    if (coinanimation > 44){
        coinanimation = 1;
    }
    if(coinanimation % 11 == 0){

        imgsrc.style.display = "none";
        imgsrc = document.getElementById(`coin-${coinanimation/11}`);  
        imgsrc.style.display = "inline-block";
    }
    RefreshInv();
    saveInventory();
    setCookie("Award",Award);
    setCookie("Upgrade");
    document.getElementById("coins-amount").innerText = coins;
    setCookie("Coins",coins);
    requestAnimationFrame(LoopCycle);
}

