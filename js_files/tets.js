let secs = 0;
let days = 0;
let hours = 0;
let minutes = 0;


function displayTime() {
    secs++
    console.log(secs)
    Daycounter()
    digital()
    return secs
}



function Daycounter() {
    if ((secs % 300) == 0) {
        days = Math.floor(secs / 300);
        console.log(days)
    }
    return days;
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
    document.getElementById("digitalclock").innerText = hours + ':' + "00";
}

function jumpintime(item){
    secs = item.value;
}

const interval = setInterval(displayTime, 1000);



/// function ElteltIdo -> visszaadja az eltelt másodpercek számát
/// function időugrás(ugrott_masodpercek) -> meghívásakor ugorjon ugrott_masodpercek másodpercet az óramutató,
/// növelje a napszálálót ha szükség van rá
/// számlálja a napokat folyamat

/// function ami visszaadja napokat 
