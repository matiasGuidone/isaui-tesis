using System.Data;
using System;
//** no existe esta tabla ;D
public class cursoalumno : oObjeto
{
     public int Idcurso { get; set; }
    public int Idalumno { get; set; }
    public int Idciclolectivo{set;get;}

      public cursoalumno() { }
    public cursoalumno(DataRow dr)
    {
        this.Idcurso = Convert.ToInt32(dr["idcurso"]);
        this.Idalumno = Convert.ToInt32(dr["idalumno"]);
        this.Idciclolectivo= Convert.ToInt32(dr["idciclolectivo"]);
    }

}