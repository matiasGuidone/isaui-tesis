using System.Data;
using System;
public class domicilio : oObjeto
{
    public string Direccion { get; set; }
    public Int32 Idlocalidad { get; set; } 
    public domicilio() { }
    public domicilio(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Direccion = dr["direccion"].ToString();
        this.Idlocalidad = Convert.ToInt32(dr["idlocalidad"]);
         
    }

}