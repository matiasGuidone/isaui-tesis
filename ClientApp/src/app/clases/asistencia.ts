
export class asistencia
{
id: number;
fecha: Date;
idhoramateria: number;
iddocente: number;
idestudiante: number;

constructor(obj:any)
{
this.id=+obj.id;
this.fecha=new Date(obj.fecha);
this.idhoramateria=+obj.idhoramateria;
this.idestudiante=+obj.idestudiante;
}

}

// this.Id = Convert.ToInt32(dr["id"]);
//         this.Fecha = Convert.ToDateTime(dr["fecha"]);
//         this.Iddocente=Convert.ToInt32(dr["iddocente"]);
//         this.Idestudiante = Convert.ToInt32(dr["idestudiante"]);
//         this.Idhoramateria = Convert.ToInt32(dr["idhoramateria"]);