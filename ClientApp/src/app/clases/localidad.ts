export class localidad{
    id : number;
    nombre : string; 
    idprovincia : number;
     
    
    constructor(id: string, nombre:string, idprovincia:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.idprovincia =  +idprovincia;
        this.nombre = nombre; 
        this.id = +id; // formateo a number el string // parseInt(val

    }
}