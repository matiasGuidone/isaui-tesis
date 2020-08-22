
export class menu {
    id : number;
    nombre : string;
    componente : string;
    tipo : string;

    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        
        this.nombre = obj.nombre;
        this.componente = obj.componente
        this.tipo = obj.tipo;
        this.id = +obj.id; // formateo a number el string // parseInt(val
    }
}