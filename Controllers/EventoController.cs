using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class EventoController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<evento> Index([FromBody] evento Evento)
    {
        EventoConexion<evento>.Instance.Insert(Evento);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<evento> Put([FromBody] evento Evento)
    {
        EventoConexion<evento>.Instance.Update(Evento);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        EventoConexion<evento>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<evento> GetEventos([FromHeader]string[] arrayfiltros)
    {
        return EventoConexion<evento>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public evento GetEvento(int id)
    {
        return EventoConexion<evento>.Instance.SearchId(id);
    }
}

