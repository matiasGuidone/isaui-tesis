using System.Data;
using System;
public class docente : oObjeto{

public string Nombre { get; set; }
public string Apellido { get; set; }
public string  Dni { get; set; }
public string correo{get;set;}
public string telefono{get; set;}
//foreign key
//public int idusuario{get; set;}
//public int iddomicilio{get; set;}
public docente(){}
public docente( DataRow dr){
    this.Id = Convert.ToInt32(dr["Id"]);
    this.Nombre = dr["nombre"].ToString();
    this.Apellido = dr["apellido"].ToString();
    this.Dni = dr["dni"].ToString();
    this.correo=dr["correo"].ToString();
    this.telefono=dr["telefono"].ToString();
    //this.iddomicilio=Convert.ToInt32(dr["Iddomicilio"]);
    //this.idusuario=Convert.ToInt32(dr["Idusuario"]);
}






}