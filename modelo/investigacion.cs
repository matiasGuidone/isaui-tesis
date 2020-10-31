using System.Data;
using System;
    public class investigacion : oObjeto
    {
         public string Descripcion{ get; set; }
        public int Idcurriculum { get; set; }
        public string Lugar { get; set; }
        public string Tipo { get; set; }
        public DateTime Fecha { get; set; }
        
        public investigacion(){}
        public investigacion(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Descripcion = dr["descripcion"].ToString();
        this.Idcurriculum = Convert.ToInt32(dr["idcurriculum"]);
        this.Lugar = Convert.ToString(dr["lugar"]);
        this.Tipo = Convert.ToString(dr["tipo"]);
        this.Fecha = Convert.ToDateTime(dr["fecha"]);
    }

    }
 