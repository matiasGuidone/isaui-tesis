import { NumberSymbol, DatePipe } from "@angular/common";

export class ciclolectivo{
         id: number;
         nombre: string;
         descripcion: string;
         fechainicio: Date;
    constructor(
          id: string,
          nombre: string,
          descripcion: string,
          fechainicio: string ) {
        this.id = +id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechainicio = new Date(fechainicio);
    }
}