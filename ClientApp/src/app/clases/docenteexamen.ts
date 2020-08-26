export class docenteexamen{
    id: number;
    iddocente : number;
    idexamen : number;
    observacion: string;
    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.iddocente= +obj.iddocente;
        this.idexamen= +obj.idexamen;
        this.observacion=obj.observacion;
         // formateo a number el string // parseInt(val

    }
    
}