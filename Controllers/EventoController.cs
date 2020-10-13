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
    public ActionResult<evento> Index([FromBody] evento Evento, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            EventoConexion<evento>.Instance.Insert(Evento);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<evento> Put([FromBody] evento Evento, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            EventoConexion<evento>.Instance.Update(Evento);
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
            EventoConexion<evento>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<evento> GetEventos([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
             if (arrayfiltros.Any(p => p == "idalumno"))
            {return EventoConexion<evento>.Instance.SearchAlumno(Convert.ToInt32(arrayfiltros[1]));}
                else if (arrayfiltros.Any(p => p == "ano"))
            {return EventoConexion<evento>.Instance.SearchAll(arrayfiltros, $" and YEAR(fechainicio) = {arrayfiltros[3]} ");}
            else{
            return EventoConexion<evento>.Instance.SearchAll(arrayfiltros);}
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public evento GetEvento(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return EventoConexion<evento>.Instance.SearchId(id);
        }
        else return null;
    }
}

