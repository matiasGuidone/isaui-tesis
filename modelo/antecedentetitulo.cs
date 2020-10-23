using System.Data;
using System;

public class antecedentetitulo : oObjeto{

public byte Relaciondocencia{get; set;}
public int Idlugar {set;get;}
public DateTime Fechainicio{set;get;}
public DateTime Fechafin{set;get;}
public int Puntajedocente{get;set;}
public string Descripcion{get;set;}
public string Titulo{get;set;}
public int Tipotitulo{set;get;}
public int Idcurriculum { get; set; }

public antecedentetitulo(){}

public antecedentetitulo(DataRow dr)
{
this.Id=Convert.ToInt32(dr["id"]);
this.Relaciondocencia= Convert.ToByte(dr["relaciondocencia"]);
this.Idlugar= Convert.ToInt32(dr["idlugar"]);
this.Fechainicio= Convert.ToDateTime(dr["fechainicio"]);
this.Fechafin=Convert.ToDateTime(dr["fechafin"]);
this.Puntajedocente= Convert.ToInt32(dr["puntajedocente"]);
this.Descripcion= dr["descripcion"].ToString();
this.Titulo= dr["titulo"].ToString();
this.Tipotitulo=Convert.ToInt32(dr["tipotitulo"]);
this.Idcurriculum=Convert.ToInt32(dr["idcurriculum"]);
}

}