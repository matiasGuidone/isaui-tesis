using System.Data;
using System;
public class docente : oObjeto{

public string Nombre { get; set; }
public string Apellido { get; set; }
public string  DNI { get; set; }

public docente(){}
public docente( DataRow dr){
    this.ID = Convert.ToInt32(dr["ID"]);
    this.Nombre = dr["Nombre"].ToString();
    this.Apellido = dr["Apellido"].ToString();
    this.DNI = dr["DNI"].ToString();
}






}