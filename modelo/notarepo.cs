using System;
using System.Data;

public class notarepo
{

    public string materia { get; set; }
    public string tipoexamen { get; set; }
    public int nota { get; set; }
    public DateTime fecha { get; set; }
    public int idexamen { get; set; }
    public int idcalificacion { get; set; }
    public string condicion { get; set; }

    public string condiciona { get; set; }

    public notarepo() { }

    public notarepo(DataRow dr)
    {

        materia = dr[0].ToString();
        tipoexamen = dr[1].ToString();
        nota = Convert.ToInt32(dr[2]);
        fecha = Convert.ToDateTime(dr[3]);
        idexamen = Convert.ToInt32(dr[4]);
        idcalificacion = Convert.ToInt32(dr[5]);
        condicion = dr["condicion"].ToString();
        condiciona = dr["condiciona"].ToString();
    }


}