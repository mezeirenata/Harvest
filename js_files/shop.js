
import { cropGenerating, Crop } from "./flower";
let Inventory = cropGenerating();
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

function setCookie(cname, cvalue, exdays = 1000) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "SameSite=None; Secure" + ";path=/";
}


function InventorySet(stringItems){

    let items = stringItems.split('/');
    items.forEach(item => {
        let crop_ = item.split('-')[0];
        let amount = Number(item.split('-')[1]);
        setAmountByName(amount,crop_);
    });
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

let coin = Number(getCookie("Coin"));
Inventory = getCookie("Inventory");

/// vesz: csekkolja a coint, vonjon le, set
/// inventory -> keresse meg a cropot, ezt a cropot állítsa át, (amount)
/// saveInventory(); 




setCookie("Coin", coin);


