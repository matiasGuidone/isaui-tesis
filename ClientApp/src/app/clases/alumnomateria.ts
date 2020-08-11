export class alumnomateria{
    id : number;
     
    idalumno : number;
    idmateria : number;
    idciclolectivo : number;
    
    constructor(id: string, idalumno:string, idmateria:string, idciclolectivo:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.idalumno = +idalumno;
        this.idmateria =  +idmateria;
        this.idciclolectivo = +idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}