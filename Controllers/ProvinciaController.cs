using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class ProvinciaController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<provincia> Index([FromBody] provincia Provincia)
    {
        ProvinciaConexion<provincia>.Instance.Insert(Provincia);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<provincia> Put([FromBody] provincia Provincia)
    {
        ProvinciaConexion<provincia>.Instance.Update(Provincia);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        ProvinciaConexion<provincia>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<provincia> GetProvincias([FromHeader]string[] arrayfiltros)
    {
        return ProvinciaConexion<provincia>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public provincia GetProvincia(int id)
    {
        return ProvinciaConexion<provincia>.Instance.SearchId(id);
    }
}

