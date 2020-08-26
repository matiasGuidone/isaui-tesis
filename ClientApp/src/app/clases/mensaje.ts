
export class mensaje{
    id : number;
    fecha : Date;
    mensaje : string;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id; // formateo a number el string // parseInt(val
        this.fecha = new Date(obj.fecha);
        this.mensaje = obj.mensaje;
        
    }
}