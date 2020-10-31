
export class investigacion
{
    id: number;
    descripcion: string;
    idcurriculum: number;
    lugar: string;
    tipo: string;
    fecha:Date;

    constructor(obj:any)
    {
        this.id= +obj.id;
        this.descripcion= obj.descripcion;
        this.idcurriculum=+ obj.idcurriculum;
        this.lugar= obj.lugar;
        this.tipo= obj.tipo;
        this.fecha= new Date(obj.fecha);
    }
}