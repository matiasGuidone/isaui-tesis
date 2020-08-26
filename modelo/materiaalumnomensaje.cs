using System.Data;
using System;
    public class materiaalumnomensaje : oObjeto
    {
        public int Idalumno{ get; set; }
        public int Idmateria { get; set; }
        public int Idmensaje{set;get;}
        public materiaalumnomensaje(){}
        public materiaalumnomensaje(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Idalumno= Convert.ToInt32(dr["idalumno"]);
        this.Idmateria= Convert.ToInt32(dr["idmateria"]);
        this.Idmensaje= Convert.ToInt32(dr["idmensaje"]);
    }

    }
 