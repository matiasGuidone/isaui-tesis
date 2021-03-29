using System.Data;
using System;
public class estudiantemateria : oObjeto
{
    public int Idestudiante { get; set; }
    public int Idmateria { get; set; }
    public int Idciclolectivo { get; set; }
    public string Estadoasistencias { get; set; }
    public string Estadonotas { get; set; }
    public estudiantemateria() { }
    public estudiantemateria(DataRow dr)
    { 
        this.Idestudiante = Convert.ToInt32(dr["idestudiante"]);
        this.Idmateria = Convert.ToInt32(dr["idmateria"]);
        this.Idciclolectivo = Convert.ToInt32(dr["idciclolectivo"]);
        this.Estadoasistencias = dr["estadoasistencias"].ToString();
        this.Estadonotas = dr["estadonotas"].ToString();
    }

}