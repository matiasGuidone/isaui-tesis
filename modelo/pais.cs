using System.Data;
using System;
public class pais : oObjeto
{
    public string Nombre { get; set; }
    
    public pais() { }
    public pais(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
         
    }

}