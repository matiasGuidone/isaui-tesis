export class estudiantemateria{
    id : number;
     
    idestudiante : number;
    idmateria : number;
    idciclolectivo : number;
    
    constructor(id:string,idestudiante:string,idmateria:string,idciclolectivo:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.idestudiante = +idestudiante;
        this.idmateria =  +idmateria;
        this.idciclolectivo = +idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}