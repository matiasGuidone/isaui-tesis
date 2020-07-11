export class alumno{
    id : number;
    nombre : string;
    apellido : string;
    dni : string;
    
    constructor(id: string, nombre:string, apellido:string, dni:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.nombre = nombre;
        this.apellido =  apellido;
        this.dni = dni;
        this.id = +id; // formateo a number el string // parseInt(valor)
        
    }
}