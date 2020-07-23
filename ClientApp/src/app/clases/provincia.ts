export class provincia{
    id : number;
    nombre : string;
    idpais : number;
    
    constructor(id: string, nombre:string, idpais: string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.idpais = +idpais;
        this.nombre =  nombre; 
        this.id = +id; // formateo a number el string // parseInt(val

    }
}