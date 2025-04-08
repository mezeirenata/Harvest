export class Grid
{
    constructor(x1,y1,sizex,sizey){
        this.StartX = x1;
        this.StartY = y1;

        this.height = sizey;
        this.width = sizex;
        
        this.EndX = x1 + this.width;
        this.EndY = y1 - this.height;

        ///
        this.bevetve = false;
        this.virag = null;
        this.ontozve = false;
        this.viragKivalasztva = null;


        this.kivalasztott = false;

        this.ido = 0; 
    }
};