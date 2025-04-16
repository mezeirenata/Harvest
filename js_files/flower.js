export class Crop{
    constructor(nev,ertek,ido,kidobottSeed,amount){
     
        this.nev = nev;
        this.ertek = Number(ertek);
        this.price = this.ertek * 2;
        this.ido = Number(ido); // msben
        this.kidobottSeed = Number(kidobottSeed);

        this.amount = Number(amount);

        this.grownamount = 0;
    }
}

export function cropGenerating(){
    let flowers = [];
    
    flowers.push(new Crop("Wheat","25","300",1,1));
    flowers.push(new Crop("Carrot","50","300",2,0));
    flowers.push(new Crop("Corn","50","600",2,0));
    flowers.push(new Crop("Eggplant","100","600",1,0));
    flowers.push(new Crop("Turnip","125","300",2,0));
    flowers.push(new Crop("Tomato","150","450",1,0));
    flowers.push(new Crop("Potato","150","450",2,0));
    flowers.push(new Crop("Cauliflower","300","500",1,0));
    flowers.push(new Crop("Pumpkin","400","750",3,0));
    flowers.push(new Crop("Lettuce","500","900",3,0));
    flowers.push(new Crop("Purplelettuce","500","900",3,0)); 
    flowers.push(new Crop("Goldencarrot","4995","1500",0,0));

    return flowers;
}