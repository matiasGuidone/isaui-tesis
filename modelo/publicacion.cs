using System.Data;
using System;
public class publicacion : oObjeto{

public string Nombre{get;set;}
public DateTime Fecha{set;get;}
public int Idcurriculum{set;get;}
public int Tipoautor{set;get;}
public int Idlocalidad{set;get;}
public publicacion(){}
public publicacion (DataRow dr){
    this.Id = Convert.ToInt32(dr["id"]);
    this.Nombre = dr["nombre"].ToString();
    this.Fecha=Convert.ToDateTime(dr["fecha"]);
    this.Idcurriculum=Convert.ToInt32(dr["idcurriculum"]);
    this.Tipoautor=Convert.ToInt32(dr["tipoautor"]);
    this.Idlocalidad=Convert.ToInt32(dr["idlocalidad"]);
    
}
}
