export class cursoestudiante{
    id : number;
    idcurso : number;
    idestudiante : number;
    idciclolectivo : number;
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id; 
        this.idcurso =  +obj.idcurso;
        this.idestudiante = +obj.idestudiante;
        this.idciclolectivo=+ obj.idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}