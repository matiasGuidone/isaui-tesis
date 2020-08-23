using System.Data;
using System;
    public class datoadjunto : oObjeto
    {
         public string Direccion{ get; set; }
        public int Tamano { get; set; }
        
        public datoadjunto(){}
        public datoadjunto(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Direccion = dr["direccion"].ToString();
        this.Tamano = Convert.ToInt32(dr["tamano"]);
    }

    }
 