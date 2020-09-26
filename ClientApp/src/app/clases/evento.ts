
export class evento
{
    id: number;
    nombre: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    tipo: number;
    idcurso:number;

    constructor(obj:any)
    {
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.fecha_inicio = new Date(obj.fecha_inicio);
        this.fecha_fin = new Date(obj.fecha_fin);
        this.tipo = +obj.tipo;
        this.idcurso = +obj.idcurso;
    }
}