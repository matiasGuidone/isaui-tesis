using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class LogueoController : Controller
{
      
    //GET
    [HttpGet]
    public JsonResult logueo([FromHeader]string usuario,[FromHeader] string pass)
    {
        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        //desencriptar
        string[] filtro = {"codigo",pass,"nombre",usuario};
        var user = UsuarioConexion<usuario>.Instance.SearchAll(filtro);
        if (user.Count==1){
            var tok = UsuarioConexion<usuario>.Instance.generarToken(user[0]);
            var obj = Json("['accessToken':'"+tok+"', 'expiresIn':60]");
         return obj;
            //this.saveToken(res.accessToken, res.expiresIn);
        }
         else return Json("404");
    }

   
}

