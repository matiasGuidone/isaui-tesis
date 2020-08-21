
export class evento
{
    id: number;
    nombre: string;
    fecha: Date;
    idmateria: number;
    idmensaje:number;

    constructor(id:string, nombre:string, fecha:string, idmateria:string, idmensaje:string)
    {
        this.id=+ id;
        this.nombre=nombre;
        this.fecha=new Date(fecha);
        this.idmateria=+ idmateria;
        this.idmensaje=+idmensaje;
    }
}