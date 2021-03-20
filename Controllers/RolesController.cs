using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class RolesController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<roles> Index([FromBody] roles Roles, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            RolesConexion<roles>.Instance.Insert(Roles);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<roles> Put([FromBody] roles Roles, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            RolesConexion<roles>.Instance.Update(Roles);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            var r = RolesConexion<roles>.Instance.Delete(Convert.ToInt32(id));
            if (r){return Json("registro eliminado");}
            else return Json("error");
        }
        else return Json("error");

    }

    //GET
    [HttpGet]
    public IEnumerable<roles> getroless([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return RolesConexion<roles>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public roles getroles(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return RolesConexion<roles>.Instance.SearchId(id);
        }
        else return null;
    }
}

