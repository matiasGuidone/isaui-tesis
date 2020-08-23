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

    
    
    constructor(obj:any){
        //el orden de os parametros afecta la vista de los input en el modal
        this.id = +obj.id;
        this.relaciondocente =+ obj.relaciondocente;
        this.idlugar =  +obj.idlugar;
        this.fechainicio = new Date (obj.fechainicio);
        this.fechafin = new Date(obj.fechafin);
        this.puntajedocente=+ obj.puntajedocente;
        this.descripcion = obj.descripcion;
        this.titulo = obj.titulo; 
        this.tipotitulo= +obj.tipotitulo;
         // formateo a number el string // parseInt(val

    }
    
}