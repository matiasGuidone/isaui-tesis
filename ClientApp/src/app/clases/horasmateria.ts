export class horasmateria
{
    id: number; 
    idmateria: number;
    idhoradia: number;
    numsemana: number;
     
    
    constructor(obj:any)
    {
        this.id= +obj.id;
        this.idmateria = +obj.idmateria;
        this.idhoradia= +obj.idhoradia;
        this.numsemana= +obj.numsemana; 
    }
}