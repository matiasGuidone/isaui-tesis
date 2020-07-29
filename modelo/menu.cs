using System.Data;
using System;
public class menu : oObjeto
{
    public string Nombre { get; set; }
    public string Componente { get; set; }
    public string Tipo { get; set; }
    public menu() { }
    public menu(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Componente = dr["componente"].ToString();
        this.Tipo = dr["tipo"].ToString();
         
    }

}