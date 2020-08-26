using System.Data;
using System;
    public class curriculumantecedente : oObjeto
    {
        public int Idcurriculum { get; set; }
        public int Idantecedente { get; set; }
        
        public curriculumantecedente(){}
        public curriculumantecedente(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Idcurriculum = Convert.ToInt32(dr["idcurriculum"]);
        this.Idantecedente= Convert.ToInt32(dr["idantecedente"]);
    }

    }
 