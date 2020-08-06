using System.Data;
using System;
    public class cicloLectivo : oObjeto
    {
        
       // public DateTime FechaInicio {get; set;}
        public string Nombre {get; set;}
        public string Descripcion {get; set;}
        
        public cicloLectivo(){}
        public cicloLectivo(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
       // this.FechaInicio = DateTime.Parse(dr["fechainicio"].ToString());
        this.Nombre = dr["nombre"].ToString();
        this.Descripcion = dr["descripcion"].ToString();
       
    }

    }
 