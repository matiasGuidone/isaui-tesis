export class materia{
    id : number;
    nombre: string;
    horas : number;
    idcurso : number;
    turno : number;
    
    
    constructor(id: string, nombre:string, horas:string, turno:string, idcurso:string){
        this.id = +id;
        this.nombre = nombre;
        this.idcurso = +idcurso;
        this.horas= +horas;
        this.turno = +turno;
}
}
 
