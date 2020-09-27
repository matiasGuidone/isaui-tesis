
export class evento
{
    id: number;
    nombre: string;
    fechainicio: Date;
    fechafin: Date;
    tipo: string;
    idcurso:number;

    constructor(obj:any)
    {
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.fechainicio = new Date(obj.fechainicio);
        this.fechafin = new Date(obj.fechafin);
        this.tipo = obj.tipo;
        this.idcurso = +obj.idcurso;
    }
}