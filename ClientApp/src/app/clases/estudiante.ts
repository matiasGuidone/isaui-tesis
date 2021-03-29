export class estudiante{
    id : number;
    nombre : string;
    apellido : string;
    numerodoc : string;
    legajo : number;
    condicion : string;
    condiciona : string;
    correo : string;
    fechanac : Date; 
    iddomicilio : number;
    idusuario : number;
    telefono: string
    
    constructor(id: string, nombre:string, apellido:string, numerodoc:string, condicion: string, condiciona: string, correo:string, fechanac:string, iddomicilio :string, idusuario:string, legajo:string, telefono:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.nombre = nombre;
        this.apellido =  apellido;
        this.numerodoc = numerodoc;
        this.legajo = +legajo;
        this.condicion = condicion;
        this.condiciona = condiciona;
        this.correo = correo ;
        this.fechanac = new Date(fechanac); 
        this.iddomicilio = +iddomicilio;
        this.idusuario = +idusuario;
        this.telefono = telefono;
         // formateo a number el string // parseInt(val

    }
    
}