export class roles{
    id : number;
    nombre : string;
   
    
    constructor(obj){
        this.id = +obj.id;
        this.nombre = obj.nombre;
    
}
}