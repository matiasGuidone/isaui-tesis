using System;
using System.Data;

public class notarepo
{

public string materia { get; set; }
public string tipoexamen { get; set; }
public int nota { get; set; }

public notarepo(){} 

public notarepo(DataRow dr)
{

    materia=dr[0].ToString();
    tipoexamen=dr[1].ToString();
    nota=Convert.ToInt32(dr[2]);
}


}