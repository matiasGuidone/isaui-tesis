
export class asistencia
{
id: number;
fecha_hora: Date;
idmateria: number;
iddocente: number;
idalumno: number;

constructor(id:string, fecha_hora:string, idmateria: string, idalumno:string, iddocente:string)
{
this.id=+id;
this.fecha_hora=new Date(fecha_hora);
this.idmateria=+idmateria;
this.iddocente=+iddocente;
this.idalumno=+idalumno;
}

}