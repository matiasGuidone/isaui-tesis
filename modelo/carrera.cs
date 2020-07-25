using System.Data;
using System;
public class carrera : oObjeto{

public string Nombre { get; set; }
public string Descripcion { get; set; }

public carrera(){}
public carrera (DataRow dr){
    this.Id = Convert.ToInt32(dr["id"]);
    this.Nombre = dr["nombre"].ToString();
    this.Descripcion = dr["descripcion"].ToString();
    
}
}

