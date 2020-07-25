export class alumno{
    id : number;
    nombre : string;
    apellido : string;
    numerodoc : string;
    condicion : string;
    correo : string;
    fechanac : Date; 
    iddomicilio : number;
    idusuario : number;
    
    constructor(id: string, nombre:string, apellido:string, numerodoc:string, condicion: string, correo:string, fechanac:string, iddomicilio :string, idusuario:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.nombre = nombre;
        this.apellido =  apellido;
        this.numerodoc = numerodoc;
        this.condicion = condicion;
        this.correo = correo ;
        this.fechanac = new Date(fechanac); 
        this.iddomicilio = +iddomicilio;
        this.idusuario = +idusuario;
         // formateo a number el string // parseInt(val

    }
    
}