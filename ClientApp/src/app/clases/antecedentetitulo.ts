export class antecedentetitulo{
    id : number;
    relaciondocente : number; //es "byte" en c# y en la Db es "tinyint"
    idlugar : number;
    fechainicio : Date;
    fechafin : Date;
    puntajedocente : number;
    descripcion : string;
    titulo : string; 
    tipotitulo: number;
    idcurriculum:number;

    
    
    constructor(id,relaciondocente,idlugar,fechainicio,fechafin,puntajedocente,descripcion,titulo,tipotitulo,idcurriculum){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +id;
        this.relaciondocente =+relaciondocente;
        this.idlugar =  +idlugar;
        this.fechainicio = new Date (fechainicio);
        this.fechafin = new Date(fechafin);
        this.puntajedocente= +puntajedocente;
        this.descripcion =  descripcion;
        this.titulo =  titulo; 
        this.tipotitulo= +tipotitulo;
        this.idcurriculum= +idcurriculum;
         // formateo a number el string // parseInt(val

    }
    
}