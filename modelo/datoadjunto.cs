using System.Data;
using System;
    public class datoadjunto : oObjeto
    {
         public string Direccion{ get; set; }
        public int Idcurriculum { get; set; }
        
        public datoadjunto(){}
        public datoadjunto(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Direccion = dr["direccion"].ToString();
        this.Idcurriculum = Convert.ToInt32(dr["idcurriculum"]);
    }

    }
 