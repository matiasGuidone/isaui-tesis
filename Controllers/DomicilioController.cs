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
    public ActionResult<domicilio> Index([FromBody] domicilio Domicilio)
    {
        DomicilioConexion<domicilio>.Instance.Insert(Domicilio);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<domicilio> Put([FromBody] domicilio Domicilio)
    {
        DomicilioConexion<domicilio>.Instance.Update(Domicilio);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        DomicilioConexion<domicilio>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<domicilio> GetDomicilios([FromHeader]string[] arrayfiltros)
    {
        return DomicilioConexion<domicilio>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public domicilio GetDomicilio(int id)
    {
        return DomicilioConexion<domicilio>.Instance.SearchId(id);
    }
}

