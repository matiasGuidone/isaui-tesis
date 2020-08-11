using System.Data;
using System;
public class roles : oObjeto{

public string Nombre{get;set;}
public roles(){}
public roles (DataRow dr){
    this.Id = Convert.ToInt32(dr["id"]);
    this.Nombre = dr["nombre"].ToString();
    
}
}
