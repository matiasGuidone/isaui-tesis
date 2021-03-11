using System.Data;
using System;
//** no existe esta tabla ;D
public class cursoestudiante : oObjeto
{
     public int Idcurso { get; set; }
    public int Idestudiante { get; set; }
    public int Idciclolectivo{set;get;}

      public cursoestudiante() { }
    public cursoestudiante(DataRow dr)
    {
        this.Idcurso = Convert.ToInt32(dr["idcurso"]);
        this.Idestudiante = Convert.ToInt32(dr["idestudiante"]);
        this.Idciclolectivo= Convert.ToInt32(dr["idciclolectivo"]);
    }

}