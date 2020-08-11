export class materia{
    id : number;
    horas : number;
    idcurso : number;
    nombre: string;
    turno : number;
    
    
    constructor(id: string, nombre:string, horas:string, turno:string, idcurso:string){
        this.id = +id;
        this.nombre = nombre;
        this.idcurso = +idcurso;
        this.horas= +horas;
        this.turno = +turno;
}
}
 
