using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class InvestigacioninformacionController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<investigacioninformacion> Index([FromBody] investigacioninformacion Investigacioninformacion)
    {
        InvestigacioninformacionConexion<investigacioninformacion>.Instance.Insert(Investigacioninformacion);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<investigacioninformacion> Put([FromBody] investigacioninformacion Investigacioninformacion)
    {
        InvestigacioninformacionConexion<investigacioninformacion>.Instance.Update(Investigacioninformacion);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        InvestigacioninformacionConexion<investigacioninformacion>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

   //GET
    [HttpGet]
    public IEnumerable<investigacioninformacion> Getinvestigacioninformacions([FromHeader]string[] arrayfiltros)
    {
        return InvestigacioninformacionConexion<investigacioninformacion>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public investigacioninformacion Getinvestigacioninformacion(int id)
    {
        return InvestigacioninformacionConexion<investigacioninformacion>.Instance.SearchId(id);
    }
}

