export class domicilio{
    id : number;
    direccion : string;
    idlocalidad : number;
    idprovincia : number;
    idpais : number; 
    
    constructor(id: string, direccion:string, idlocalidad:string, idprovincia:string, idpais: string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.direccion = direccion;
        this.idlocalidad = +idlocalidad;
        this.idprovincia =  +idprovincia;
        this.idpais = +idpais;
        this.id = +id; // formateo a number el string // parseInt(val

    }
}