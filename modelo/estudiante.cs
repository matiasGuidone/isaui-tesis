using System.Data;
using System;
public class estudiante : oObjeto
{
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Numerodoc { get; set; }
    public int Legajo { get; set; }
    public string Condicion { get; set; }
    public string Correo { get; set; }
    public DateTime Fechanac { get; set; }
    public int Iddomicilio { get; set; } 
    public int Idusuario { get; set; }
    public estudiante() { }
    public estudiante(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Apellido = dr["apellido"].ToString();
        this.Numerodoc = dr["numerodoc"].ToString();
        this.Condicion = dr["condicion"].ToString();
        this.Correo = dr["correo"].ToString();
        this.Fechanac = Convert.ToDateTime(dr["fechanac"]);
        try
        {
            this.Iddomicilio = Convert.ToInt32(dr["iddomicilio"]);
        }
        catch (System.Exception)
        {
            this.Iddomicilio = 0;
        }
        this.Idusuario = Convert.ToInt32(dr["idusuario"]);
        this.Legajo = Convert.ToInt32(dr["legajo"]);
    }

}