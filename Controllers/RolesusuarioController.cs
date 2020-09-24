using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class RolesusuarioController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<rolesusuario> Index([FromBody] rolesusuario Rolesusuario, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        RolesusuarioConexion<rolesusuario>.Instance.Insert(Rolesusuario);
        return Json("Guardado exitoso");
}
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<rolesusuario> Put([FromBody] rolesusuario Rolesusuario, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        RolesusuarioConexion<rolesusuario>.Instance.Update(Rolesusuario);
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
        RolesusuarioConexion<rolesusuario>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<rolesusuario> Getrolesusuarios([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return RolesusuarioConexion<rolesusuario>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public rolesusuario Getrolesusuario(int id, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return RolesusuarioConexion<rolesusuario>.Instance.SearchId(id);
        }
        else return null;
    }
}

