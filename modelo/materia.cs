using System.Data;
using System;
public class materia : oObjeto
{
    public int Horas { get; set; }
    public int Idcurso { get; set; }
    public string Nombre{ get; set; }
    public int Turno { get; set; }
    
    public materia() { }
    public materia(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Turno = Convert.ToInt32(dr["turno"]);
        this.Idcurso = Convert.ToInt32(dr["idcurso"]);
        this.Horas = Convert.ToInt32(dr["horas"]);
        
    }

}