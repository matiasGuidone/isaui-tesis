export class antecedentetitulo{
    id : number;
    relaciondocencia : string; //es "byte" en c# y en la Db es "tinyint"
    lugar : string;
    fechainicio : Date;
    fechafin : Date;
    puntajedocente : number;
    descripcion : string;
    titulo : string; 
    tipotitulo: string;
    idcurriculum:number;

    
    
    constructor(id,relaciondocente,lugar,fechainicio,fechafin,puntajedocente,descripcion,titulo,tipotitulo,idcurriculum){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.relaciondocencia = relaciondocente;
        this.lugar =  lugar;
        this.fechainicio = new Date (fechainicio);
        this.fechafin = new Date(fechafin);
        this.puntajedocente= +puntajedocente;
        this.descripcion =  descripcion;
        this.titulo =  titulo; 
        this.tipotitulo= tipotitulo;
        this.idcurriculum= +idcurriculum;
         // formateo a number el string // parseInt(val

    }
    
}