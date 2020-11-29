using System.Data;
using System;
    public class currcov : oObjeto
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public int Idcurriculum { get; set; }
        public int Idconvocatoria { get; set; }
        public currcov(){}
        public currcov (DataRow dr){
            this.Nombre = dr["nombre"].ToString();
            this.Descripcion =  dr["descripcion"].ToString();
            this.Fecha = Convert.ToDateTime(dr["fechafin"]);
            this.Idconvocatoria = Convert.ToInt32(dr["idconvocatoria"]);
            this.Idcurriculum = Convert.ToInt32(dr["idcurriculum"]);
        }
}
 