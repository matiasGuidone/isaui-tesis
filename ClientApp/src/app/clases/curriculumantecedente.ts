export class curriculumantecedente{
    id: number;
    idcurriculum : number;
    idantecedente : number;
    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;

        this.idcurriculum= +obj.idcurriculum;
        this.idantecedente = +obj.idantecedente;
         // formateo a number el string // parseInt(val

    }
    
}