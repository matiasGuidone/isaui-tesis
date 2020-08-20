using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class ExamenController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<examen> Index([FromBody] examen Examen)
    {
        ExamenConexion<examen>.Instance.Insert(Examen);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<examen> Put([FromBody] examen Examen)
    {
        ExamenConexion<examen>.Instance.Update(Examen);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        ExamenConexion<examen>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<examen> GetDomicilios([FromHeader]string[] arrayfiltros)
    {
        return ExamenConexion<examen>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public examen GetDomicilio(int id)
    {
        return ExamenConexion<examen>.Instance.SearchId(id);
    }
}

