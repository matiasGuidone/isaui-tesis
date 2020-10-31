using System.Data;
using System;

public class curriculum : oObjeto
{

    public string Nombre { get; set; }
    public string Apellido { set; get; }
    public DateTime Fechanac { get; set; }
    public int Sexo { get; set; }
    public string Numerodoc { set; get; }
    public string Telefono { get; set; }
    public string Telefonodos { set; get; }

    public string Correo { get; set; }

    public string Observaciones { get; set; }
    public int Tipodoc { get; set; }
    public int Iddomicilio { get; set; }

    public int Idusuario { get; set; }
    public curriculum() { }

    public curriculum(DataRow dr)
    {
        this.Id = Convert.ToInt32(dr["id"]);
        this.Nombre = dr["nombre"].ToString();
        this.Apellido = dr["apellido"].ToString();
        this.Numerodoc = dr["numerodoc"].ToString();
        this.Telefonodos = dr["telefonodos"].ToString();
        this.Telefono = dr["telefono"].ToString();
        this.Correo = dr["correo"].ToString();
        this.Observaciones = dr["observaciones"].ToString();
        this.Tipodoc = Convert.ToInt32(dr["tipodoc"]);
        this.Iddomicilio = Convert.ToInt32(dr["iddomicilio"]);
        this.Idusuario = Convert.ToInt32(dr["idusuario"]);
        this.Fechanac = Convert.ToDateTime(dr["fechanac"]);
        this.Sexo = Convert.ToInt32(dr["sexo"]);
    }

}

// this.id = +obj.id;
//         this.nombre = obj.nombre;
//         this.apellido =  obj.apellido;
//         this.fechanac =  new Date(obj.fechanac);
//         this.sexo =  +obj.sexo;
//         this.numerodoc = obj.numerodoc;
//         this.telefono= obj.telefono;
//         this.telefonodos = obj.telefonodos;
//         this.correo = obj.correo ; 
//         this.observaciones = obj.observaciones; 
//         this.tipodoc = +obj.tipodoc; 
//         this.iddomicilio = +obj.iddomicilio;
//         this.idusuario= +obj.idusuario;