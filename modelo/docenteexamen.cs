using System.Data;
using System;
    public class docenteexamen : oObjeto
    {
        public int Iddocente{ get; set; }
        public int Idexamen { get; set; }
        public String Observacion{set;get;}
        public docenteexamen(){}
        public docenteexamen(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Iddocente= Convert.ToInt32(dr["iddocente"]);
        this.Idexamen= Convert.ToInt32(dr["idexamen"]);
        this.Observacion= dr["observacion"].ToString();
    }

    }
 