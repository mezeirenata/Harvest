export class Grid
{
    constructor(x1,y1,x2,y2){
        this.StartX = x1;
        this.StartY = y1;
        this.width = x2-x1;
        this.height = y2-y1;
        this.EndX = x2;
        this.EndY = y2;

        ///
        this.bevetve = false;
        this.virag = null;
        this.ontozve = false;

        this.ido = 0; /// masodperc, amikor bevetve = true akkor elkezd szamolni;
    }
};