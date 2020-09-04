export class rolesusuario{
    id : number; 
    idroles : number;
    idusuario : number;
    descripcion : string;
   
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.idroles = +obj.idroles;
        this.idusuario =  +obj.idusuario;
        this.descripcion = obj.descripcion;
       
         // formateo a number el string // parseInt(val

    }
    
}