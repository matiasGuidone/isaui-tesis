using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<docente> Index([FromBody] docente docente, [FromHeader] string token)
    {
         if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        DocenteConexion<docente>.Instance.Insert(docente);
        return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<docente> Put([FromBody] docente docente, [FromHeader] string token)
    {
 
 if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        DocenteConexion<docente>.Instance.Update(docente);
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
        DocenteConexion<docente>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        }
        else return null;
     

    }

    //GET
    [HttpGet]
    public IEnumerable<docente> Getdocentes([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
     if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return DocenteConexion<docente>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docente Getdocente(int id, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return DocenteConexion<docente>.Instance.SearchId(id);
        }
        else return null;
    }


  
}

