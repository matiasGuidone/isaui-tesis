
export class mensaje{
    id : number;
    fecha_inicio : Date;
    fecha_fin: Date;
    titulo: string;
    mensaje : string;
    idcurso: number;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id; // formateo a number el string // parseInt(val
        this.fecha_inicio = new Date(obj.fecha_inicio);
        this.fecha_fin= new Date (obj.fecha_fin);
        this.titulo= obj.titulo;
        this.mensaje = obj.mensaje;
        this.idcurso= + obj.idcurso;
    }
}