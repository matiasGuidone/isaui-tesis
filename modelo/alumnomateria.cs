using System.Data;
using System;
public class alumnomateria : oObjeto
{
    public int Idalumno { get; set; }
    public int Idmateria { get; set; }
    public int Idciclolectivo { get; set; }
    public alumnomateria() { }
    public alumnomateria(DataRow dr)
    { 
        this.Idalumno = Convert.ToInt32(dr["idalumno"]);
        this.Idmateria = Convert.ToInt32(dr["idmateria"]);
        this.Idciclolectivo = Convert.ToInt32(dr["idciclolectivo"]);
    }

}