export class lugar{
    id : number;
    nombre : string; 
    observacion: string;
    iddommicilio : number;
     
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id; // formateo a number el string // parseInt(val
        this.nombre = obj.nombre; 
        this.observacion =  obj.observacion;
        this.iddommicilio= +obj.iddommicilio;
        
        

    }
}