
export class provincia {
    id : number;
    nombre : string;
    idpais : number;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal

        this.idpais = +obj.idpais;
        this.nombre =  obj.nombre; 
        this.id = +obj.id; // formateo a number el string // parseInt(val

    }
}