using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Newtonsoft.Json;


[Route("api/[controller]")]

public class LogueoController : Controller
{
      
    //GET
    [HttpGet]
    public JsonResult logueo([FromHeader]string usuario,[FromHeader]string pass, [FromHeader] string token,[FromHeader]string rol)
    {
        if( rol==null ){
        string condicion = $" AND codigo LIKE '{pass}' AND nombre LIKE '{usuario}'";
        var user = UsuarioConexion<usuario>.Instance.SearchAll(null,condicion);
 
        if (user.Count==1){
            var tok = UsuarioConexion<usuario>.Instance.generarToken(user[0]);
            
            var rolEncontrado = UsuarioConexion<usuario>.Instance.datosUsuario(user[0].Id);
            
            var componentes= "";
            if(!rolEncontrado.Contains("***multiple***")){
                var rolObject = JsonConvert.DeserializeObject<datorol>(rolEncontrado);
                //rolEncontrado.Substring(rolEncontrado.IndexOf(":")+3,(rolEncontrado.LastIndexOf("}")-3)-(rolEncontrado.IndexOf(":")+3))
                componentes =  MenuConexion<usuario>.Instance.getComponentsByUser(user[0].Id,rolObject.nombrerol);
                }
            else{componentes =" \"componentes\" : []";rolEncontrado = rolEncontrado.Replace("***multiple***","");}
            //var obj = Json("{ ,\"accessToken\":\""+tok+"\", \"expiresIn\": \"60\" }");//, "+componentes+"}");
            var obj2=Json("{ \"accessToken\":\""+tok+"\", \"expiresIn\": \"60\", "+componentes+",\"rol\": "+rolEncontrado+"}");
            
         return obj2;
            //this.saveToken(res.accessToken, res.expiresIn);
        }
        }
        else  if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        { 
            string condicion = $" AND codigo LIKE '{pass}' AND nombre LIKE '{usuario}'";
            var user = UsuarioConexion<usuario>.Instance.SearchAll(null,condicion);
            var rolEncontrado = UsuarioConexion<usuario>.Instance.datosUsuario(user[0].Id,token,rol);
            var componentes =  MenuConexion<usuario>.Instance.getComponentsByUser(user[0].Id,rol);
             var obj2=Json("{ \"accessToken\":\""+token+"\", \"expiresIn\": \"60\", "+componentes+",\"rol\": "+rolEncontrado+"}");
      
         return obj2;
           
        }
        return Json("404");
    }

   
}

