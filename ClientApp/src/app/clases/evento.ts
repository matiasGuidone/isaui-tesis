
export class evento
{
    id: number;
    nombre: string;
    fecha: Date;
    idmateria: number;
    idmensaje:number;

    constructor(obj:any)
    {
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.fecha = new Date(obj.fecha);
        this.idmateria = +obj.idmateria;
        this.idmensaje = +obj.idmensaje;
    }
}