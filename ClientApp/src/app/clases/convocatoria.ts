
export class convocatoria{

    id: number;
    fechainicio: Date;
    fechafin:Date;
    descripcion: string;
    idmateria: number;
    estado: number;

    constructor(obj)
    {
        this.id =+ obj.id;
        this.fechainicio = new Date(obj.fechainicio);
        this.fechafin = new Date(obj.fechafin);
        this.descripcion = obj.descripcion;
        this.idmateria = +obj.idmateria;
        this.estado = +obj.estado;
    }
    
}