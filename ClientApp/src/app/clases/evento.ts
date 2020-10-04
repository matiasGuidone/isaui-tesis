
export class evento
{
    id: number;
    nombre: string;
    fechainicio: Date;
    fechafin: Date;
    tipo: string;
    idmateria:number;

    constructor(obj:any)
    {
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.fechainicio = new Date(obj.fechainicio);
        this.fechafin = new Date(obj.fechafin);
        this.tipo = obj.tipo;
        this.idmateria = +obj.idmateria;
    }
}