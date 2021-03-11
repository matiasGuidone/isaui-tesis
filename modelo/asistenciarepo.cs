using System.Data;
using System;
public class asistenciarepo  
{ 
    public string estudiante { get; set; }
    public string Materia { get; set; }
    public int ModulosPresente { get; set; }
     public int CantidadModulos { get; set; }
    public asistenciarepo() { }
    public asistenciarepo(DataRow dr)
    { 
        this.estudiante = dr["estudiante"].ToString();
        this.Materia = dr["Materia"].ToString();
        this.ModulosPresente = Convert.ToInt32(dr["ModulosPresente"]);
        this.CantidadModulos = Convert.ToInt32(dr["CantidadModulos"]);
    }

}