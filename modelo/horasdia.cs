using System.Data;
using System;
public class horasdia : oObjeto
{
 
    public string hora { get; set; } 
    public int numorden {get;set;} 

    public horasdia() { }
    public horasdia(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.hora = dr["hora"].ToString();
        this.numorden=Convert.ToInt32(dr["numorden"]); 
    }

}