using System.Data;
using System;

public class antecedentetitulo : oObjeto{

public string Relaciondocencia{get; set;}
public string Lugar {set;get;}
public DateTime Fechainicio{set;get;}
public DateTime Fechafin{set;get;}
public int Puntajedocente{get;set;}
public string Descripcion{get;set;}
public string Titulo{get;set;}
public string Tipotitulo{set;get;}
public int Idcurriculum { get; set; }

public antecedentetitulo(){}

public antecedentetitulo(DataRow dr)
{
this.Id=Convert.ToInt32(dr["id"]);
this.Relaciondocencia= Convert.ToString(dr["relaciondocencia"]);
this.Lugar= Convert.ToString(dr["lugar"]);
this.Fechainicio= Convert.ToDateTime(dr["fechainicio"]);
this.Fechafin=Convert.ToDateTime(dr["fechafin"]);
this.Puntajedocente= Convert.ToInt32(dr["puntajedocente"]);
this.Descripcion= dr["descripcion"].ToString();
this.Titulo= dr["titulo"].ToString();
this.Tipotitulo=Convert.ToString(dr["tipotitulo"]);
this.Idcurriculum=Convert.ToInt32(dr["idcurriculum"]);
}

}