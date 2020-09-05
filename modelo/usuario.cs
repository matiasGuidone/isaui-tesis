using System.Data;
using System;
public class usuario : oObjeto
{
    public string Nombre { get; set; }
    public string Codigo { get; set; }
    public string Codigoayuda{ get; set; }
    public string Correo { get; set; }
    public int Estado{get;set;}
    public usuario() { }
    public usuario(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Codigo = dr["codigo"].ToString();
        this.Codigoayuda = dr["codigoayuda"].ToString();
        this.Correo = dr["correo"].ToString();
        this.Estado=Convert.ToInt32(dr["estado"]);
    }

}