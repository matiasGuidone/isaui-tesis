using System.Data;
using System;
public class materia : oObjeto
{
    public string Nombre{ get; set; }
    public int Idcurso { get; set; }

    public materia() { }
    public materia(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString(); 
        this.Idcurso = Convert.ToInt32(dr["idcurso"]);
       
        
    }

}