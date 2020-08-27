using System.Data;
using System;
public class docentemateria : oObjeto
{
    public int Iddocente { get; set; }
    public int Idmateria { get; set; }
    public int Idciclolectivo { get; set; }
    public docentemateria() { }
    public docentemateria(DataRow dr)
    { 
        this.Iddocente = Convert.ToInt32(dr["iddocente"]);
        this.Idmateria = Convert.ToInt32(dr["idmateria"]);
        this.Idciclolectivo = Convert.ToInt32(dr["idciclolectivo"]);
    }

}