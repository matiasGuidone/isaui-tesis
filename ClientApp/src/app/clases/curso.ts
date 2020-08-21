export class curso{
    id : number;
    nombre : string;
    descripcion : string;
    nivel : number;
    idcarrera : number;  

    constructor(id: string, nombre:string, descripcion:string, nivel:string, idcarrera: string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = nombre;
        this.nivel =  +nivel;
        this.idcarrera = +idcarrera;
        this.descripcion = descripcion;
        this.id = +id; // formateo a number el string // parseInt(val
    }
}