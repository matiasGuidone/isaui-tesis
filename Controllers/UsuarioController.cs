using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class UsuarioController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<usuario> Index([FromBody] usuario usuario, [FromHeader] string token)
    {
        if(token == null && usuario != null){
           var auxusu = UsuarioConexion<usuario>.Instance.SearchAll(null,$" and nombre = '{usuario.Nombre}'");
            if(auxusu.Count==1){
                return Json("UsuarioExistente");
            }
            usuario.Codigoayuda="usuario-cv";
            var id = UsuarioConexion<usuario>.Instance.Insert(usuario);
            RolesusuarioConexion<rolesusuario>.Instance.addRolCv(id);
            return Json("UsuarioCv");
        }

        else if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        UsuarioConexion<usuario>.Instance.Insert(usuario);
        return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<usuario> Put([FromBody] usuario usuario, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        UsuarioConexion<usuario>.Instance.Update(usuario);
        return Json("Guardado exitoso");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        UsuarioConexion<usuario>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<usuario> Getusuarios([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
    if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return UsuarioConexion<usuario>.Instance.SearchAll(arrayfiltros);
            }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}" )]
    public usuario Getusuario(int id, string nom=null, string cod=null, [FromHeader] string token=null)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return UsuarioConexion<usuario>.Instance.SearchId(id);
            }
        else return null;
        
    }
}

