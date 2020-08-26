export class localidad{
    id : number;
    nombre : string; 
    idprovincia : number;
     
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id; // formateo a number el string // parseInt(val
        this.nombre = obj.nombre; 
        this.idprovincia =  +obj.idprovincia;
        
        

    }
}