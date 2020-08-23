export class datoadjunto{
    id : number;
    direccion : string;
    tamano: number;
    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.direccion = obj.direccion;
        this.tamano = +obj.tamano;
         // formateo a number el string // parseInt(val

    }
}