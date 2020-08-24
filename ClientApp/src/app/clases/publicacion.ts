export class publicacion{
    id : number;
    nombre : string;
    fecha: Date;
    idcurriculum: number;
    tipoautor:number;
    idlocalidad: number;
    
    constructor(obj:any){
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.fecha=new Date(obj.fecha);
        this.idcurriculum=+obj.idcurriculum;
        this.tipoautor=+obj.tipoautor;
        this.idlocalidad=+obj.idlocalidad;
}
}