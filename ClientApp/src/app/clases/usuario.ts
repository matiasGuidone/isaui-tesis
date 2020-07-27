export class usuario{
    id : number;
    nombre : string;
    codigo : string;
    codigoayuda: string;
    correo : string;
    
    
    constructor(id: string, nombre:string, codigo:string, codigoayuda:string, correo:string){
        this.id = +id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.codigoayuda= codigoayuda;
        this.correo = correo;
}
}