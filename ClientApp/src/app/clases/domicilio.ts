export class domicilio{
    id : number;
    direccion : string;
    idlocalidad : number;
   
    
    constructor(id: string, direccion:string, idlocalidad:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.direccion = direccion;
        this.idlocalidad = +idlocalidad;
        
        this.id = +id; // formateo a number el string // parseInt(val

    }
}