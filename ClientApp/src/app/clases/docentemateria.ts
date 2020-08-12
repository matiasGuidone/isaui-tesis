export class docentemateria{
    id : number;
     
    iddocente : number;
    idmateria : number;
    idciclolectivo : number;
    
    constructor(id: string, iddocente:string, idmateria:string, idciclolectivo:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.iddocente = +iddocente;
        this.idmateria =  +idmateria;
        this.idciclolectivo = +idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}