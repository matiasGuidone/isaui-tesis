
export class examen
{
    id: number;
    fecha: Date;
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