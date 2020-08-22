export class usuario{
    id : number;
    nombre : string;
    codigo : string;
    codigoayuda: string;
    correo : string;
    
    
    constructor(obj){
        this.id = +obj.id;
        this.nombre = obj.nombre;
        this.codigo = obj.codigo;
        this.codigoayuda= obj.codigoayuda;
        this.correo = obj.correo;
}
}