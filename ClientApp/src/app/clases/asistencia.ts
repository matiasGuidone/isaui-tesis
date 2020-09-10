
export class asistencia
{
id: number;
fecha: Date;
idhoramateria: number;
iddocente: number;
idalumno: number;

constructor(obj:any)
{
this.id=+obj.id;
this.fecha=new Date(obj.fecha);
this.idhoramateria=+obj.idhoramateria;
this.iddocente=+obj.iddocente;
this.idalumno=+obj.idalumno;
}

}

// this.Id = Convert.ToInt32(dr["id"]);
//         this.Fecha = Convert.ToDateTime(dr["fecha"]);
//         this.Iddocente=Convert.ToInt32(dr["iddocente"]);
//         this.Idalumno = Convert.ToInt32(dr["idalumno"]);
//         this.Idhoramateria = Convert.ToInt32(dr["idhoramateria"]);