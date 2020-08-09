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
    public ActionResult<pais> Index([FromBody] pais Pais)
    {
        PaisConexion<pais>.Instance.Insert(Pais);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<pais> Put([FromBody] pais Pais)
    {
        PaisConexion<pais>.Instance.Update(Pais);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        PaisConexion<pais>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<pais> GetPaiss([FromHeader]string[] arrayfiltros)
    {
        return PaisConexion<pais>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public pais GetPais(int id)
    {
        return PaisConexion<pais>.Instance.SearchId(id);
    }
}

