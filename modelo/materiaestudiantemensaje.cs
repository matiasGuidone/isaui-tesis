using System.Data;
using System;
    public class estudiantemensaje : oObjeto
    {
        public string Idestudiante{ get; set; }
        public string NombreMateria { get; set; }
        public string mensaje{set;get;}
        public string tituloMensaje {set; get;}
        public int estado { get; set; }
        
        public estudiantemensaje()
        {
            
        }
        public estudiantemensaje(DataRow row)
        {
               Id =Convert.ToInt32(row["idmensaje"]);
               Idestudiante= row["idestudiante"].ToString();
               tituloMensaje=row["titulo"].ToString();
               NombreMateria=row["nombre"].ToString();
               mensaje=row["mensaje"].ToString();
               estado = Convert.ToInt32(row["estado"]); 
        }
    }
 