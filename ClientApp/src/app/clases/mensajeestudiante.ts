export class mensajeestudiante {
    id: number;
    idestudiante: string;
    tituloMensaje: string;
    nombreMateria: string;
    mensaje: string;


    constructor(obj: any) {
        this.id = +obj.id;
        this.idestudiante = obj.idestudiante;
        this.tituloMensaje = obj.tituloMensaje;
        this.nombreMateria = obj.nombreMateria;
        this.mensaje = obj.mensaje;
    }
}
