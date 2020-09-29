using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;


[Route("api/[controller]")]

public class LogueoController : Controller
{
      
    //GET
    [HttpGet]
    public JsonResult logueo([FromHeader]string usuario,[FromHeader]string pass, [FromHeader] string token)
    {
        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        //desencriptar
        //string[] filtro = {"codigo",pass,"nombre",usuario};
          Conexion con = new Conexion();
          DataTable Tabla = new DataTable();
          var rol = con.consultaDataTable($"SELECT roles.nombre FROM((usuario INNER JOIN rolesusuario on usuario.Id = rolesusuario.Idusuario) INNER JOIN roles on roles.Id =rolesusuario.Idroles) WHERE usuario.nombre='{usuario}'");
          Tabla = rol.Tables[0];
          string rolEncontrado ="";
          if (Tabla.Rows.Count == 1){
            foreach(DataRow row in Tabla.Rows){
               rolEncontrado=row["nombre"].ToString();
            }
          }
          string condicion = $" AND codigo LIKE '{pass}' AND nombre LIKE '{usuario}'";
        var user = UsuarioConexion<usuario>.Instance.SearchAll(null,condicion);

        if (user.Count==1){
            var tok = UsuarioConexion<usuario>.Instance.generarToken(user[0]);
            var componentes =  MenuConexion<usuario>.Instance.getComponentsByUser(user[0].Id);

        var obj = Json("{ ,\"accessToken\":\""+tok+"\", \"expiresIn\": \"60\", "+componentes+"}");
        var obj2=Json("{ \"accessToken\":\""+tok+"\", \"expiresIn\": \"60\", "+componentes+",\"rol\":\""+rolEncontrado+"\"}");
      
         return obj2;
            //this.saveToken(res.accessToken, res.expiresIn);
        }
         else return Json("404");
    }

   
}

