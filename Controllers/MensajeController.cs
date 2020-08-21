using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class MensajeController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<mensaje> Index([FromBody] mensaje Mensaje)
    {
        MensajeConexion<mensaje>.Instance.Insert(Mensaje);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<mensaje> Put([FromBody] mensaje Mensaje)
    {
        MensajeConexion<mensaje>.Instance.Update(Mensaje);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        MensajeConexion<mensaje>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

   //GET
    [HttpGet]
    public IEnumerable<mensaje> GetMensajes([FromHeader]string[] arrayfiltros)
    {
        return MensajeConexion<mensaje>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public mensaje GetMensaje(int id)
    {
        return MensajeConexion<mensaje>.Instance.SearchId(id);
    }
}

