using System.Data;
using System;

public class calificacionalumno : oObjeto
{

    public int Idalumno { get; set; }

    public int nota { set; get; }
    public int Idexamen { set; get; }

    public calificacionalumno() { }

    public calificacionalumno(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Idalumno = Convert.ToInt32(dr["idalumno"]);
        this.nota = Convert.ToInt32(dr["nota"]);
        this.Idexamen = Convert.ToInt32(dr["idexamen"]);
    }

}