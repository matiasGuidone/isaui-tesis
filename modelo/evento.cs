using System.Data;
using System;
public class evento : oObjeto
{
    public string Nombre { get; set; }
    public DateTime Fecha_Inicio{ get; set; }
    public DateTime Fecha_Fin { get; set; }
    public int Tipo {get;set;}
    public int Idcurso{get;set;} 
    public evento() { }
    public evento(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Fecha_Inicio = Convert.ToDateTime(dr["fecha_inicio"]);
        this.Fecha_Fin= Convert.ToDateTime(dr["fecha_fin"]);
        this.Tipo= Convert.ToInt32(dr["tipo"]);
        this.Idcurso=Convert.ToInt32(dr["idcurso"]);
    }

}