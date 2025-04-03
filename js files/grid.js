export class Grid
{
    constructor(x1,y1,size){
        this.StartX = x1;
        this.StartY = y1;

        this.height = size;
        this.width = size;
        
        this.EndX = x1 + size;
        this.EndY = y1 - size;

        ///
        this.bevetve = false;
        this.virag = null;
        this.ontozve = false;

        this.kivalasztott = false;

        this.ido = 0; /// masodperc, amikor bevetve = true akkor elkezd szamolni;
    }
};