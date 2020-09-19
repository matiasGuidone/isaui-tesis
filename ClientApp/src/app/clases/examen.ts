
export class examen
{
    id: number;
    fecha: Date; 
    idmateria: number;
    idciclolectivo: number;
    tipo: string;
    observaciones: string;

    constructor(obj:any)
    {
        this.id = +obj.id;
        this.fecha = new Date(obj.fecha);
        this.idmateria =+ obj.idmateria;
        this.idciclolectivo = +obj.idciclolectivo;
        this.tipo = obj.tipo;
        this.observaciones = obj.observaciones;
    }
}