using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class MateriaalumnomensajeController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<materiaalumnomensaje> Index([FromBody] materiaalumnomensaje Materiaalumnomensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Insert(Materiaalumnomensaje);
            return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<materiaalumnomensaje> Put([FromBody] materiaalumnomensaje Materiaalumnomensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Update(Materiaalumnomensaje);
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
            MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<materiaalumnomensaje> Getmateriaalumnomensajes([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public materiaalumnomensaje Getmateriaalumnomensaje(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.SearchId(id);
        }
        else return null;
    }
}

