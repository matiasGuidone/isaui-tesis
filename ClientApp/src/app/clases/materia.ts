export class materia{
    id : number;
    nombre: string;
    horas : number;
    turno : number;
    idcurso : number;
    
    
    
    constructor(obj:any){
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.horas= +obj.horas;
        this.turno = +obj.turno; 
        this.idcurso = +obj.idcurso;
}
}
 
