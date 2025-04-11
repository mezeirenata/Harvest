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
    let flowers = [];
    
    flowers.push(new Crop("Wheat","25","300",2,1));
    flowers.push(new Crop("Carrot","50","300",2,0));
    return flowers;
}