using System.Data;
using System;

public class curriculum: oObjeto{

public string Nombre {get; set;}
public string Apellido {set;get;}
public string Numerodoc{set;get;}
public string Telefonosdos{set;get;}
public string Telefono{get;set;}
public string Correo{get;set;}
public string Obeservaciones{get;set;}
public int Idadjunto{set;get;}
public int Iddomicilio{get;set;}
public int Tipodoc{get;set;}

public curriculum(){}

public curriculum(DataRow dr)
{
this.Id=Convert.ToInt32(dr["id"]);
this.Nombre= dr["nombre"].ToString();
this.Apellido= dr["apellido"].ToString();
this.Numerodoc= dr["numerodoc"].ToString();
this.Telefonosdos=dr["telefonodos"].ToString();
this.Telefono= dr["telefono"].ToString();
this.Correo= dr["correo"].ToString();
this.Obeservaciones= dr["observaciones"].ToString();
this.Idadjunto=Convert.ToInt32(dr["idadjunto"]);
this.Iddomicilio= Convert.ToInt32(dr["iddomicilio"]);
this.Tipodoc= Convert.ToInt32(dr["tipodoc"]);
}

}