export class cursoalumno{
    id : number;
    idcurso : number;
    idalumno : number;
    idciclolectivo : number;
    
    constructor(id: string, idalumno:string, idcurso:string, idciclolectivo:string){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id; 
        this.idcurso =  +idcurso;
        this.idalumno = +idalumno;
        this.idciclolectivo=+ idciclolectivo;
       
         // formateo a number el string // parseInt(val

    }
    
}