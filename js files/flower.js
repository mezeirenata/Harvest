export class Crop{
    constructor(nev,ertek,ido, image,seedimage, kidobottSeed,amount){
     
        this.nev = nev;
        this.ertek = Number(ertek);
        this.price = this.ertek * 2;
        this.ido = Number(ido); // msben
        this.image = image;
        this.seedimage = seedimage;
        this.kidobottSeed = kidobottSeed;

        this.amount = amount;
    }
}

export function cropGenerating(){
    /// alaplétező virág generálása, ebből egyszerre lehet akár több is
    let flowers = [];
    
    flowers.push(new Crop("Wheat","25","3000","/images/Wheatseed.png","/images/Wheat.png",2,1));
    flowers.push(new Crop("Carrot","50","3000","/images/CarrotSeed.png","images/carrot.png",2,0));
    return flowers;
}