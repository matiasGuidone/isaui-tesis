using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class LocalidadController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<localidad> Index([FromBody] localidad Localidad, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return Json(LocalidadConexion<localidad>.Instance.Insert(Localidad));
             
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<localidad> Put([FromBody] localidad Localidad, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            LocalidadConexion<localidad>.Instance.Update(Localidad);
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
            LocalidadConexion<localidad>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<localidad> GetLocalidads([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return LocalidadConexion<localidad>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public localidad GetLocalidad(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return LocalidadConexion<localidad>.Instance.SearchId(id);
        }
        else return null;
    }
}

