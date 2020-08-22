export class ciclolectivo{
         id: number;
         nombre: string;
         descripcion: string;
         fechainicio: Date;

    constructor(obj) {
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.descripcion = obj.descripcion;
        this.fechainicio = new Date(obj.fechainicio);
    }
}