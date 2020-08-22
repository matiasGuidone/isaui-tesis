export class curso{
    id : number;
    nombre : string;
    descripcion : string;
    nivel : number;
    idcarrera : number;  

    constructor(obj){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = obj.nombre;
        this.nivel =  +obj.nivel;
        this.idcarrera = +obj.idcarrera;
        this.descripcion = obj.descripcion;
        this.id = +obj.id; // formateo a number el string // parseInt(val
    }
}