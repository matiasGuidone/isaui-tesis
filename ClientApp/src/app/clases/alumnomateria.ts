export class alumnomateria{
    id : number;
     
    idalumno : number;
    idmateria : number;
    idciclolectivo : number;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.idalumno = +obj.idalumno;
        this.idmateria =  +obj.idmateria;
        this.idciclolectivo = +obj.idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}