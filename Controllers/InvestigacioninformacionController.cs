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
    public ActionResult<investigacioninformacion> Index([FromBody] investigacioninformacion Investigacioninformacion, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            InvestigacioninformacionConexion<investigacioninformacion>.Instance.Insert(Investigacioninformacion);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<investigacioninformacion> Put([FromBody] investigacioninformacion Investigacioninformacion, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            InvestigacioninformacionConexion<investigacioninformacion>.Instance.Update(Investigacioninformacion);
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
            InvestigacioninformacionConexion<investigacioninformacion>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<investigacioninformacion> Getinvestigacioninformacions([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return InvestigacioninformacionConexion<investigacioninformacion>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public investigacioninformacion Getinvestigacioninformacion(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return InvestigacioninformacionConexion<investigacioninformacion>.Instance.SearchId(id);
        }
        else return null;
    }
}

