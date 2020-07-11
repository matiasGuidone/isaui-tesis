export class docente{
    id : number;
    nombre : string;
    apellido : string;
    dni : string;
    
    constructor(id: string, nombre:string, apellido:string, dni:string){
        this.apellido =  apellido;
        this.dni = dni;
        this.id = +id;
        this.nombre = nombre;
    }
}