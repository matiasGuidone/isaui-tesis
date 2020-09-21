export class materia{
    id : number;
    nombre: string;
    idcurso : number;
       
    constructor(obj:any){
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.idcurso = +obj.idcurso;
}
}
 
