
export class asistencia
{
id: number;
fecha_hora: Date;
idmateria: number;
iddocente: number;
idalumno: number;

constructor(obj:any)
{
this.id=+obj.id;
this.fecha_hora=new Date(obj.fecha_hora);
this.idmateria=+obj.idmateria;
this.iddocente=+obj.iddocente;
this.idalumno=+obj.idalumno;
}

}