using System.Data;
using System;

public class calificacionalumno : oObjeto{

public int Idalumno{get; set;}
public int Idmateria {set;get;}
public int nota{set;get;}
public int Idexamen{set;get;}
public string Observacion{get;set;}


public calificacionalumno(){}

public calificacionalumno(DataRow dr)
{
this.Id=Convert.ToInt32(dr["id"]);
this.Idalumno= Convert.ToInt32(dr["idalumno"]);
this.Idmateria= Convert.ToInt32(dr["idmateria"]);
this.nota= Convert.ToInt32(dr["nota"]);
this.Idexamen=Convert.ToInt32(dr["idexamen"]);
this.Observacion= dr["observacion"].ToString();

}

}