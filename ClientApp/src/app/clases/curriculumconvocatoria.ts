export class curriculumconvocatoria{

    idcurriculum : number;
    idconvocatoria : number;
    puntaje: number;
    prioridad: number;


    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal

        this.idcurriculum= +obj.idcurriculum;
        this.idconvocatoria= +obj.idconvocatoria;
        this.puntaje= +obj.puntaje;
        this.prioridad= +obj.prioridad;
         // formateo a number el string // parseInt(val

    }

}
