using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteexamenController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<docenteexamen> Index([FromBody] docenteexamen Docenteexamen, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            DocenteexamenConexion<docenteexamen>.Instance.Insert(Docenteexamen);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<docenteexamen> Put([FromBody] docenteexamen Docenteexamen, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            DocenteexamenConexion<docenteexamen>.Instance.Update(Docenteexamen);
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
            DocenteexamenConexion<docenteexamen>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<docenteexamen> Getdocenteexamens([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DocenteexamenConexion<docenteexamen>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docenteexamen Getdocenteexamen(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DocenteexamenConexion<docenteexamen>.Instance.SearchId(id);
        }
        else return null;
    }
}

