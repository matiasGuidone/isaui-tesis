
export class convocatoria{

    id: number;
    fechainicio: Date;
    fechafin:Date;
    descripcion: string;
    idmateria: number;
    estado: number;

    constructor(id:string, fechainicio:string, fechafin:string, descripcion: string, idmateria:string, estado:string)
    {
        this.id=+ id;
        this.fechainicio= new Date(fechainicio);
        this.fechafin=new Date(fechafin);
        this.descripcion= descripcion;
        this.idmateria=+idmateria;
        this.estado= +estado;
    }
    
}