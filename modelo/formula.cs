using System.Data;
using System;
public class formula : oObjeto
{

    public string Script { get; set; }
    public string Titulo { get; set; }
    public int Estado { get; set; }
    public formula() { }
    public formula(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Script = dr["script"].ToString();
        this.Estado = Convert.ToInt32(dr["estado"]);
        this.Titulo = dr["titulo"].ToString();

    }
}
