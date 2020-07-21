export class pais{
    id : number;
    nombre : string;
    
    constructor(id: string, nombre:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = nombre;
        this.id = +id; // formateo a number el string // parseInt(val
    }
}