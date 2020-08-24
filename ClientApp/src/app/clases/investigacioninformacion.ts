
export class investigacioninformacion
{
    id: number;
    descripcion: string;
    idcurriculum: number;
    idlugar: number;
    tipo: number;

    constructor(obj:any)
    {
        this.id= +obj.id;
        this.descripcion= obj.descripcion;
        this.idcurriculum=+ obj.idcurriculum;
        this.idlugar=+obj.idlugar;
        this.tipo= +obj.tipo;
    }
}