using System.Data;
using System;
    public class investigacioninformacion : oObjeto
    {
         public string Descripcion{ get; set; }
        public int Idcurriculum { get; set; }
        public int Idlugar { get; set; }
        public int Tipo { get; set; }
        
        public investigacioninformacion(){}
        public investigacioninformacion(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Descripcion = dr["descripcion"].ToString();
        this.Idcurriculum = Convert.ToInt32(dr["idcurriculum"]);
        this.Idlugar = Convert.ToInt32(dr["idlugar"]);
        this.Tipo = Convert.ToInt32(dr["tipo"]);
    }

    }
 