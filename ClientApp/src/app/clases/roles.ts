export class roles{
    id : number;
    nombre : string;
   
    
    constructor(obj:any){
        this.id = +obj.id;
        this.nombre = obj.nombre;
    
}
}