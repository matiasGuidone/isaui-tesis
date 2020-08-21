using System.Data;
using System;
public class evento : oObjeto
{
    public string Nombre { get; set; }
    public DateTime Fecha{ get; set; }
    public int Idmateria {get;set;}
    public int Idmensaje{get;set;} 
    public evento() { }
    public evento(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Fecha = Convert.ToDateTime(dr["fecha"]);
        this.Idmateria= Convert.ToInt32(dr["idmateria"]);
        this.Idmensaje=Convert.ToInt32(dr["idmensaje"]);
    }

}