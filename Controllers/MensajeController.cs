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
    public ActionResult<mensaje> Index([FromBody] mensaje Mensaje, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MensajeConexion<mensaje>.Instance.Insert(Mensaje);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<mensaje> Put([FromBody] mensaje Mensaje, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MensajeConexion<mensaje>.Instance.Update(Mensaje);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            var r = MensajeConexion<mensaje>.Instance.Delete(Convert.ToInt32(id));
            if (r) {return Json("registro eliminado");} else return Json("error");
        }
        else return Json("error");
    }

    //GET
    [HttpGet]
    public IEnumerable<mensaje> GetMensajes([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return MensajeConexion<mensaje>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public mensaje GetMensaje(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return MensajeConexion<mensaje>.Instance.SearchId(id);
        }
        else return null;
    }

    [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return  MensajeConexion<mensaje>.Instance.cantidadRegistros;
        }
        else return 0;
    }
}

