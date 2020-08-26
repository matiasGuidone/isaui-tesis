export class docentemateria{
    id : number;
     
    iddocente : number;
    idmateria : number;
    idciclolectivo : number;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.iddocente = +obj.iddocente;
        this.idmateria =  +obj.idmateria;
        this.idciclolectivo = +obj.idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}