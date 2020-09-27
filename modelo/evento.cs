using System.Data;
using System;
public class evento : oObjeto
{
    public string Nombre { get; set; }
    public DateTime Fechainicio{ get; set; }
    public DateTime Fechafin { get; set; }
    public string Tipo {get;set;}
    public int Idcurso{get;set;} 
    public evento() { }
    public evento(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Fechainicio = Convert.ToDateTime(dr["fechainicio"]);
        this.Fechafin= Convert.ToDateTime(dr["fechafin"]);
        this.Tipo= dr["tipo"].ToString();
        this.Idcurso=Convert.ToInt32(dr["idcurso"]);
    }

}