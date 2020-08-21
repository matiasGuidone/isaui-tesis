using System.Data;
using System;
public class docente : oObjeto{

public string Nombre { get; set; }
public string Apellido { get; set; }
public string  Dni { get; set; }
public string Correo{get;set;}
public string Telefono{get; set;}
//foreign key
public int Idusuario{get; set;}
public int Iddomicilio{get; set;}
public int Legajo{get; set;}
public docente(){}
public docente( DataRow dr){
    this.Id = Convert.ToInt32(dr["id"]);
    this.Nombre = dr["nombre"].ToString();
    this.Apellido = dr["apellido"].ToString();
    this.Dni = dr["dni"].ToString();
    this.Correo=dr["correo"].ToString();
    this.Telefono=dr["telefono"].ToString();
    this.Idusuario=Convert.ToInt32(dr["idusuario"]); 
    this.Iddomicilio=Convert.ToInt32(dr["iddomicilio"]);
    this.Legajo= Convert.ToInt32(dr["legajo"]);
}






}