using System.Data;
using System;
    public class curriculumconvocatoria : oObjeto
    {
        public int Idcurriculum { get; set; }
        public int Idconvocatoria { get; set; }
        public int Puntaje{set;get;}
        public int Prioridad{get;set;}
        public curriculumconvocatoria(){}
        public curriculumconvocatoria(DataRow dr)
    {
        this.Idcurriculum = Convert.ToInt32(dr["idcurriculum"]);
        this.Idconvocatoria= Convert.ToInt32(dr["idconvocatoria"]);
        this.Puntaje= Convert.ToInt32(dr["puntaje"]);
        this.Prioridad=Convert.ToInt32(dr["prioridad"]);
        
    }

    }
 