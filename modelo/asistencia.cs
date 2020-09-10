using System.Data;
using System;
public class asistencia : oObjeto
{
    public int Idalumno { get; set; } 
    public int Iddocente {get;set;}
    public int Idhoramateria { get; set; } 
    public DateTime Fecha {get;set;}

    public asistencia() { }
    public asistencia(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Fecha = Convert.ToDateTime(dr["fecha"]);
        this.Iddocente=Convert.ToInt32(dr["iddocente"]);
        this.Idalumno = Convert.ToInt32(dr["idalumno"]);
        this.Idhoramateria = Convert.ToInt32(dr["idhoramateria"]);
    }

}