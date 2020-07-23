export class domicilio{
    id : number;
    direccion : string;
    idlocalidad : number;
    idprovincia : number;
    idpais : number; 
    
    constructor(id: string, direccion:string, idlocalidad:string, idprovincia:string, idpais: string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.idpais = +idpais;
        this.idprovincia =  +idprovincia;
        this.idlocalidad = +idlocalidad;
        this.direccion = direccion;
        this.id = +id; // formateo a number el string // parseInt(val

    }
}