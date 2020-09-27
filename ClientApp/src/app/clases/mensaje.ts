
export class mensaje{
    id : number;
    fechainicio : string;
    fechafin: Date;
    titulo: string;
    mensaje : string;
    idcurso: number;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id; // formateo a number el string // parseInt(val
        this.fechainicio = obj.fechainicio;
        this.fechafin= new Date (obj.fechafin);
        this.titulo= obj.titulo;
        this.mensaje = obj.mensaje;
        this.idcurso= + obj.idcurso;
    }
}