export class menu{
    id : number;
    nombre : string;
    componente : string;
    tipo : string;
    
    constructor(id: string, nombre:string, componente:string, tipo:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = nombre;
        this.componente = componente
        this.tipo = tipo;
        this.id = +id; // formateo a number el string // parseInt(val
    }
}