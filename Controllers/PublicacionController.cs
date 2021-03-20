using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class PublicacionController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<publicacion> Index([FromBody] publicacion Publicacion, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            PublicacionConexion<publicacion>.Instance.Insert(Publicacion);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<publicacion> Put([FromBody] publicacion Publicacion, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            PublicacionConexion<publicacion>.Instance.Update(Publicacion);
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
            var r = PublicacionConexion<publicacion>.Instance.Delete(Convert.ToInt32(id));
            if (r) {return Json("registro eliminado");}
            else return Json("error");
        }
        else return Json("error");

    }

    //GET
    [HttpGet]
    public IEnumerable<publicacion> getpublicacions([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return PublicacionConexion<publicacion>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public publicacion getpublicacion(int id, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return PublicacionConexion<publicacion>.Instance.SearchId(id);
        }
        else return null;
    }
}

