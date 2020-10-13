export class mensajeAlumno{
    id : number;
    idAlumno : string;
    titulo: string;
    nombreMateria : string;
    mensaje: string;


    constructor(obj:any){
        this.id = +obj.id;
        this.idAlumno = obj.idAlumno;
        this.titulo = obj.titulo;
        this.nombreMateria = obj.nombreMateria;
        this.mensaje = obj.mensaje;
}
}
