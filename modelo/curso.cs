using System.Data;
using System;
    public class curso : oObjeto
    {
         public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int Nivel { get; set; }
        public int Idcarrera { get; set; }
        
        public curso(){}
        public curso(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Descripcion = dr["descripcion"].ToString();
        this.Nivel = Convert.ToInt32(dr["nivel"]);
        this.Idcarrera = Convert.ToInt32(dr["idcarrera"]);
    }

    }
 