using System;
using System.Data;

public class ordenmerito
{
    public string postulante { get; set; }
    public string materia{ get; set; }
    public double puntaje { get; set; }
    public int prioridad { get; set; }

    public ordenmerito()
    {}
    public ordenmerito(DataRow dr)
    {
     this.postulante =dr["postulante"].ToString();  
     this.materia=dr["materia"].ToString();
     this.puntaje=Convert.ToDouble(dr["puntaje"]);
     this.prioridad=Convert.ToInt32(dr["prioridad"]);
    }
}