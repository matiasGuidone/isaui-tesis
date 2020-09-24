using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DatoadjuntoController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<datoadjunto> Index([FromBody] datoadjunto datoadjunto, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            DatoadjuntoConexion<datoadjunto>.Instance.Insert(datoadjunto);
            return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<datoadjunto> Put([FromBody] datoadjunto datoadjunto, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {

            DatoadjuntoConexion<datoadjunto>.Instance.Update(datoadjunto);
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
            DatoadjuntoConexion<datoadjunto>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<datoadjunto> Getdatoadjuntos([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DatoadjuntoConexion<datoadjunto>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public datoadjunto Getdatoadjunto(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DatoadjuntoConexion<datoadjunto>.Instance.SearchId(id);
        }
        else return null;
    }
}

