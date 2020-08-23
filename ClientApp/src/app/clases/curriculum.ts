export class curriculum{
    id : number;
    nombre : string;
    apellido : string;
    numerodoc : string;
    telefonodos : string;
    telefono : string;
    correo : string;
    observacion : string; 
    idadjunto: number;
    iddomicilio : number;
    tipodoc : number;
    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.apellido =  obj.apellido;
        this.numerodoc = obj.numerodoc;
        this.telefonodos = obj.telefonodos;
        this.telefono= obj.telefono;
        this.correo = obj.correo ;
        this.observacion = obj.observacion; 
        this.idadjunto= +obj.idadjunto;
        this.iddomicilio = +obj.iddomicilio;
        this.tipodoc = +obj.tipodoc;
         // formateo a number el string // parseInt(val

    }
    
}