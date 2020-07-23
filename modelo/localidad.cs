using System.Data;
using System;
public class localidad : oObjeto
{
    public string Nombre { get; set; }
    public int Idprovincia { get; set; }
    public localidad() { }
    public localidad(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Idprovincia = Convert.ToInt32(dr["idprovincia"]);
        this.Nombre = dr["nombre"].ToString(); 
    }

}