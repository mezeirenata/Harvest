let secs = 0;
let days = 0;


export function displayTime() {
    secs++;
    return secs;
    }

export function Daycounter() {
    if ((secs % 300) == 0) {
        days++;
    }
    return days;
}

export function jumpintime(){
    document.getElementById("clockarm").style.animation =  "none";
    document.getElementById("clockarm").style.animation =  "clockarm 300s infinite";
}




/// function ElteltIdo -> visszaadja az eltelt másodpercek számát
/// function időugrás(ugrott_masodpercek) -> meghívásakor ugorjon ugrott_masodpercek másodpercet az óramutató,
/// növelje a napszálálót ha szükség van rá
/// számlálja a napokat folyamat

/// function ami visszaadja napokat 
