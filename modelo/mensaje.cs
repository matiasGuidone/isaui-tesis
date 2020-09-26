using System.Data;
using System;
public class mensaje : oObjeto
{
    public DateTime Fecha_Inicio { get; set; }
    public DateTime Fecha_Fin{get; set;}
    public string Titulo { get; set; }
    public string Mensaje { get; set; }
    public int Idcurso { get; set; }
    public mensaje() { }
    public mensaje(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Fecha_Inicio = Convert.ToDateTime(dr["fecha_inicio"]);
        this.Fecha_Fin= Convert.ToDateTime(dr["fecha_fin"]);
        this.Titulo= dr["titulo"].ToString();
        this.Mensaje = dr["mensaje"].ToString();
        this.Idcurso= Convert.ToInt32(dr["idcurso"]);
    }

}