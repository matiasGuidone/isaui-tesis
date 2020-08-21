export class materia{
    id : number;
    nombre: string;
    horas : number;
    turno : number;
    idcurso : number;
    
    
    
    constructor(id: string, nombre:string, horas:string, turno:string, idcurso:string){
        this.id = +id;
        this.nombre = nombre;
        this.horas= +horas;
        this.turno = +turno; 
        this.idcurso = +idcurso;
}
}
 
