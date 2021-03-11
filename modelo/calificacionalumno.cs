using System.Data;
using System;

public class calificacionestudiante : oObjeto
{

    public int Idestudiante { get; set; }

    public int nota { set; get; }
    public int Idexamen { set; get; }

    public calificacionestudiante() { }

    public calificacionestudiante(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Idestudiante = Convert.ToInt32(dr["idestudiante"]);
        this.nota = Convert.ToInt32(dr["nota"]);
        this.Idexamen = Convert.ToInt32(dr["idexamen"]);
    }

}