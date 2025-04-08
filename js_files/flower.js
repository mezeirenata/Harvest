export class Crop{
    constructor(nev,ertek,ido,kidobottSeed,amount){
     
        this.nev = nev;
        this.ertek = Number(ertek);
        this.price = this.ertek * 2;
        this.ido = Number(ido); // msben
        this.kidobottSeed = Number(kidobottSeed);

        this.amount = Number(amount);
    }
}

export function cropGenerating(){
    /// alaplétező virág generálása, ebből egyszerre lehet akár több is
    let flowers = [];
    
    flowers.push(new Crop("Wheat","25","3000",2,1));
    flowers.push(new Crop("Carrot","50","3000",2,0));
    return flowers;
}