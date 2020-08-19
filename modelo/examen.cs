using System;
using System.Data;
public class examen : oObjeto
{

    public DateTime Fecha{set;get;}
    public string Observaciones{set;get;}
    public int Idmateria{set;get;}
    public string Tipo{set;get;}

    public examen(){}

    public examen(DataRow dr)
    {
        this.Id=Convert.ToInt32(dr["id"]);
        this.Fecha=Convert.ToDateTime(dr["fecha"]);
        this.Observaciones=dr["observaciones"].ToString();
        this.Idmateria=Convert.ToInt32(dr["idmateria"]);
        this.Tipo=dr["tipo"].ToString();
    }

}