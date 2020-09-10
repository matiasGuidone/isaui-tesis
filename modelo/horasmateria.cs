using System.Data;
using System;
public class horasmateria : oObjeto
{
    public int numsemana { get; set; } // del 0{domingo} al 6{sábado}
    public int Idmateria {get;set;}
    public int Idhoradia { get; set; }  

    public horasmateria() { }
    public horasmateria(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.numsemana = Convert.ToInt32(dr["numsemana"]);
        this.Idmateria = Convert.ToInt32(dr["idmateria"]);
        this.Idhoradia = Convert.ToInt32(dr["idhoradia"]);
    }

}