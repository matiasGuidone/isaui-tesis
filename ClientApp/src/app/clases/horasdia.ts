export class horasdia
{
    id: number;
    hora: string; 
    numorden: number;  

    constructor(obj:any)
    {
        this.id= +obj.id;
        this.hora =  obj.hora;
        this.numorden = +obj.numorden;   
    }
}