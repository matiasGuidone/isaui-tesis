
export class mensaje{
    id : number;
    fecha : Date;
    mensaje : string;
    
    constructor(id: string, fecha:string, mje:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id; // formateo a number el string // parseInt(val
        this.fecha = new Date(fecha);
        this.mensaje = mje;
        
    }
}