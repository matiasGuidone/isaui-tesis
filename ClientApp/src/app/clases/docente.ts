export class docente{
    id : number;
    nombre : string;
    apellido : string;
    dni : string;
    correo: string;
    telefono: string;
    idusuario: number;
    iddomicilio: number;
    
    constructor(id: string, nombre:string, apellido:string, dni:string, correo:string, telefono:string, iddomicilio:string, idusuario:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = nombre;
        this.apellido =  apellido;
        this.dni = dni;
        this.id = +id; // formateo a number el string // parseInt(valor)
        this.correo=correo;
        this.telefono=telefono;
        this.idusuario=+idusuario;
        this.iddomicilio=+iddomicilio;
    }
}