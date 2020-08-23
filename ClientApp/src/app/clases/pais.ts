
export class pais {
    id : number;
    nombre : string;
    
    constructor(obj: any){
        //el orden de os parametros afecta la vista de los input en el modal
      
        this.nombre = obj.nombre;
        this.id = +obj.id; // formateo a number el string // parseInt(val
    }
}