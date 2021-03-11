export class mensajeestudiante{
    id : number;
    idestudiante : string;
    titulo: string;
    nombreMateria : string;
    mensaje: string;


    constructor(obj:any){
        this.id = +obj.id;
        this.idestudiante = obj.idestudiante;
        this.titulo = obj.titulo;
        this.nombreMateria = obj.nombreMateria;
        this.mensaje = obj.mensaje;
}
}
