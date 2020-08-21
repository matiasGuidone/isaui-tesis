export class docente{
    id : number;
    nombre : string;
    apellido : string;
    dni : string;
    correo: string;
    telefono: string;
    idusuario: number;
    iddomicilio: number;
    legajo: number;
    
    constructor(id: string, nombre:string, apellido:string, dni:string, correo:string, telefono:string, idusuario:string, iddomicilio:string, legajo:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id; // formateo a number el string // parseInt(valor)
        this.nombre = nombre;
        this.apellido =  apellido;
        this.dni = dni;
        this.correo=correo;
        this.telefono=telefono;
        this.idusuario=+idusuario; 
        this.iddomicilio=+iddomicilio;
        this.legajo=+legajo;
    }
    
  
}
        