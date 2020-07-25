export class curso{
    id : number;
    descripcion : string;
    nivel : number;
    nombre : string;
    idcarrera : number;  

    constructor(id: string, descripcion:string, nivel:string, nombre:string, idcarrera: string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = nombre;
        this.nivel =  +nivel;
        this.idcarrera = +idcarrera;
        this.descripcion = descripcion;
        this.id = +id; // formateo a number el string // parseInt(val
    }
}