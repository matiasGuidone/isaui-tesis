export class datoadjunto{
    id : number;
    direccion : string;
    idcurriculum: number;//utilizo esta columna para almacenar el id de curriculum
    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.direccion = obj.direccion;
        this.idcurriculum = +obj.idcurriculum;
         // formateo a number el string // parseInt(val

    }
}