using System;
using System.Data;

public class convocatoria: oObjeto{

    public DateTime Fechainicio{get;set;}
    public DateTime Fechafin{get;set;}
    public string Descripcion{get;set;}
    public int Idmateria{get;set;}
    public int Estado{get;set;}

    public convocatoria(){}

    public convocatoria(DataRow dr){
        this.Id= Convert.ToInt32(dr["id"]);
        this.Fechainicio= Convert.ToDateTime(dr["fechainicio"]);
        this.Fechafin=Convert.ToDateTime(dr["fechafin"]);
        this.Descripcion=dr["descripcion"].ToString();
        this.Idmateria=Convert.ToInt32(dr["idmateria"]);
        this.Estado= Convert.ToInt32(dr["estado"]);
    }
}