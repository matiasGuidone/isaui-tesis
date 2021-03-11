using System.Data;
using System;
public class asistencia : oObjeto
{
    public int Idestudiante { get; set; } 
    public int Idhoramateria { get; set; } 
    public DateTime Fecha {get;set;}

    public asistencia() { }
    public asistencia(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Fecha = Convert.ToDateTime(dr["fecha"]);
        this.Idestudiante = Convert.ToInt32(dr["idestudiante"]);
        this.Idhoramateria = Convert.ToInt32(dr["idhoramateria"]);
    }

}