import { Data } from "@angular/router";

export class convocatoria{

    id: number;
    fechainicio: Data;
    fechafin:Data;
    descripcion: string;
    idmateria: number;
    estado: string;

    constructor(id:string, fechainicio:string, fechafin:string, descripcion: string, idmateria:string, estado:string)
    {
        this.id=+ id;
        this.fechainicio= new Date(fechainicio);
        this.fechafin=new Date(fechafin);
        this.descripcion= descripcion;
        this.idmateria=+Number;
        this.estado= estado;
    }
}