using System.Data;
using System;
public class lugar : oObjeto
{
    public string Nombre { get; set; }
    public string Observaciones{get;set;}
    public int Iddomicilio{ get; set; }
    public lugar() { }
    public lugar(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Observaciones=dr["observaciones"].ToString();
        this.Iddomicilio= Convert.ToInt32(dr["iddomicilio"]);
    }

}