export class domicilio{
    id : number;
    direccion : string;
    idlocalidad : number;
   
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.direccion = obj.direccion;
        this.idlocalidad = +obj.idlocalidad; 
        this.id = +obj.id; // formateo a number el string // parseInt(val

    }
}