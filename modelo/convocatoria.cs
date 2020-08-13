using System;
using System.Data;

public class convocatoria: oObjeto{

    public DateTime Fechainicio;
    public DateTime Fechafin;
    public string Descripcion;
    public int Idmateria;
    public int Estado;

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