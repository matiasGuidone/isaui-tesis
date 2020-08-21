using System.Data;
using System;
public class mensaje : oObjeto
{
    public DateTime Fecha { get; set; }
    public string Mensaje { get; set; }
    public mensaje() { }
    public mensaje(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Fecha = Convert.ToDateTime(dr["fecha"]);
        this.Mensaje = dr["mensaje"].ToString();
    }

}