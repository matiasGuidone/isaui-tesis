using System.Data;
using System;
    public class ciclolectivo : oObjeto
    {
        
       // public DateTime FechaInicio {get; set;}
        public string Nombre {get; set;}
        public string Descripcion {get; set;}
        public DateTime Fechainicio { get; set; }           
        
        public ciclolectivo(){}
        public ciclolectivo(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Descripcion = dr["descripcion"].ToString();
        this.Fechainicio = Convert.ToDateTime(dr["fechainicio"]);
       
    }

    }
 