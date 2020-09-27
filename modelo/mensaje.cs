using System.Data;
using System;
public class mensaje : oObjeto
{
    public DateTime Fechainicio { get; set; }
    public DateTime Fechafin{get; set;}
    public string Titulo { get; set; }
    public string Mensaje { get; set; }
    public int Idmateria { get; set; }
    public int Iddocente { get; set; }
    public mensaje() { }
    public mensaje(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Fechainicio = Convert.ToDateTime(dr["fechainicio"]);
        this.Fechafin= Convert.ToDateTime(dr["fechafin"]);
        this.Titulo= dr["titulo"].ToString();
        this.Mensaje = dr["mensaje"].ToString();
        this.Idmateria= Convert.ToInt32(dr["idmateria"]);
         this.Iddocente= Convert.ToInt32(dr["iddocente"]);
    }

}