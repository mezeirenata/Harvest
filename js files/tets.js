let secs = 0;
let days = 0;


function displayTime() {
    secs++
    console.log(secs)
    return secs
    }

function Daycounter() {
    if ((secs % 300) == 0) {
        days++
        console.log(days)
    }
}

function jumpintime(item){
    secs = item.value;
    document.getElementById("clockarm").style.animation =  "none"
    document.getElementById("clockarm").style.animation =  "clockarm 300s infinite"
}

const interval = setInterval(displayTime, 1000);



/// function ElteltIdo -> visszaadja az eltelt másodpercek számát
/// function időugrás(ugrott_masodpercek) -> meghívásakor ugorjon ugrott_masodpercek másodpercet az óramutató,
/// növelje a napszálálót ha szükség van rá
/// számlálja a napokat folyamat

/// function ami visszaadja napokat 
