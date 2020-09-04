using System.Data;
using System;
    public class rolesusuario : oObjeto
    {
        public int Idroles{ get; set; }
        public int Idusuario { get; set; }
        public string Descripcion{set;get;}
        public rolesusuario(){}
        public rolesusuario(DataRow dr)
    {
        //this.Id = Convert.ToInt32(dr["id"]);
        this.Idroles= Convert.ToInt32(dr["idroles"]);
        this.Idusuario= Convert.ToInt32(dr["idusuario"]);
        this.Descripcion= dr["descripcion"].ToString();
    }

    }
 