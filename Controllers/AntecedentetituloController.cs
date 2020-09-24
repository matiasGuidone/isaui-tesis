using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AntecedentetituloController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<antecedentetitulo> Index([FromBody] antecedentetitulo antecedentetitulo, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        AntecedentetituloConexion<antecedentetitulo>.Instance.Insert(antecedentetitulo);
        return Json("Guardado exitoso");
        }
        else return Json("...");

    }

    // PUT
    [HttpPut]
    public ActionResult<antecedentetitulo> Put([FromBody] antecedentetitulo antecedentetitulo, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        AntecedentetituloConexion<antecedentetitulo>.Instance.Update(antecedentetitulo);
        return Json("Guardado exitoso");
        }
        else return Json("...");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        AntecedentetituloConexion<antecedentetitulo>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        }
        else return Json("...");

    }

    //GET
    [HttpGet]
    public IEnumerable<antecedentetitulo> Getantecedentetitulos([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return AntecedentetituloConexion<antecedentetitulo>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public antecedentetitulo Getantecedentetitulo(int id, [FromHeader] string token)
    {
      if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return AntecedentetituloConexion<antecedentetitulo>.Instance.SearchId(id);
        }
        else return null;
    }
}

