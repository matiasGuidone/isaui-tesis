
export class examen
{
    id: number;
    fecha: Date;
    observaciones: string;
    idmateria: number;
    tipo: string;

    constructor(obj:any)
    {
        this.id= +obj.id;
        this.fecha=new Date(obj.fecha);
        this.observaciones= obj.observaciones;
        this.idmateria=+ obj.idmateria;
        this.tipo= obj.tipo;
    }
}