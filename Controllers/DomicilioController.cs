using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DomicilioController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<domicilio> Index([FromBody] domicilio Domicilio, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return Json(DomicilioConexion<domicilio>.Instance.Insert(Domicilio));
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<domicilio> Put([FromBody] domicilio Domicilio, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            DomicilioConexion<domicilio>.Instance.Update(Domicilio);
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
            DomicilioConexion<domicilio>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<domicilio> GetDomicilios([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DomicilioConexion<domicilio>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public domicilio GetDomicilio(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DomicilioConexion<domicilio>.Instance.SearchId(id);
        }
        else return null;
    }
}

