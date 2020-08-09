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
    public ActionResult<localidad> Index([FromBody] localidad Localidad)
    {
        LocalidadConexion<localidad>.Instance.Insert(Localidad);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<localidad> Put([FromBody] localidad Localidad)
    {
        LocalidadConexion<localidad>.Instance.Update(Localidad);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        LocalidadConexion<localidad>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<localidad> GetLocalidads([FromHeader]string[] arrayfiltros)
    {
        return LocalidadConexion<localidad>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public localidad GetLocalidad(int id)
    {
        return LocalidadConexion<localidad>.Instance.SearchId(id);
    }
}

