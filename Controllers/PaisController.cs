using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class PaisController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<pais> Index([FromBody] pais Pais, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        PaisConexion<pais>.Instance.Insert(Pais);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<pais> Put([FromBody] pais Pais, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        PaisConexion<pais>.Instance.Update(Pais);
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
        var r = PaisConexion<pais>.Instance.Delete(Convert.ToInt32(id));
        if (r){return Json("registro eliminado");} else return Json("error");
        }
        else return Json("error");
    }

    //GET
    [HttpGet]
    public IEnumerable<pais> GetPaiss([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return PaisConexion<pais>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public pais GetPais(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return PaisConexion<pais>.Instance.SearchId(id);
        }
        else return null;
    }
}

