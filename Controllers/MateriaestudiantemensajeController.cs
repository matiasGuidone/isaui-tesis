using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

[Route("api/[controller]")]

public class estudiantemensajeController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<estudiantemensaje> Index([FromBody] estudiantemensaje estudiantemensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            estudiantemensajeConexion<estudiantemensaje>.Instance.InsertAlter(estudiantemensaje);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<estudiantemensaje> Put([FromBody] estudiantemensaje estudiantemensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            estudiantemensajeConexion<estudiantemensaje>.Instance.InsertAlter(estudiantemensaje);
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
            estudiantemensajeConexion<estudiantemensaje>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public JsonResult mensajes([FromHeader]string arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
           var mensajes_e =  estudiantemensajeConexion<estudiantemensaje>.Instance.getmensajes(arrayfiltros);
          
          return Json(mensajes_e);
        }
        else { return Json("no tenes los permisos suficientes"); }
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public estudiantemensaje Getestudiantemensaje(int id, [FromHeader] string token)
    {
     /*    if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        { */
            return estudiantemensajeConexion<estudiantemensaje>.Instance.SearchId(id);
     /*    }
        else return null; */
    }
}

