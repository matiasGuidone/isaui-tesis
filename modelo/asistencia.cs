using System.Data;
using System;
public class asistencia : oObjeto
{
    public DateTime Fecha_hora{get;set;}
    public int Iddocente{get;set;}
    public int Idalumno { get; set; }
    public int Idmateria { get; set; }
    public asistencia() { }
    public asistencia(DataRow dr)
    {
        this.Fecha_hora=Convert.ToDateTime(dr["fecha_hora"]);
        this.Iddocente=Convert.ToInt32(dr["iddocente"]);
        this.Idalumno = Convert.ToInt32(dr["idalumno"]);
        this.Idmateria = Convert.ToInt32(dr["idmateria"]);
    }

}