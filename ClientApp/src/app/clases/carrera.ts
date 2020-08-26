export class carrera{
    id : number;
    nombre : string;
    descripcion : string;
    
    
    constructor(obj:any){
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.descripcion =  obj.descripcion;
}
}