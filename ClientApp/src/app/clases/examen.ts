import { ThrowStmt } from "@angular/compiler";
import { Data } from "@angular/router";

export class examen
{
    id: number;
    fecha: Data;
    observaciones: string;
    idmateria: number;
    tipo: string;

    constructor(id:string, fecha:string, obeservacion:string, idmateria:string, tipo:string)
    {
        this.id=+ id;
        this.fecha=new Date(fecha);
        this.observaciones=obeservacion;
        this.idmateria=+ idmateria;
        this.tipo=tipo;
    }
}