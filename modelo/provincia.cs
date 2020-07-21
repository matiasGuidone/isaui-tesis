using System.Data;
using System;
public class provincia : oObjeto
{
    public string Nombre { get; set; }
    public int Idpais { get; set; }
    public provincia() { }
    public provincia(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Idpais = Convert.ToInt32(dr["idpais"]);
        this.Nombre = dr["nombre"].ToString();
         
    }

}