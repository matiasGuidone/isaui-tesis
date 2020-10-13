using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CicloLectivoController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<ciclolectivo> addCicloLectivo([FromBody] ciclolectivo cicloLectivo, [FromHeader] string token)
    { 
         if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CicloLectivoConexion<ciclolectivo>.Instance.Insert(cicloLectivo);
        return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<ciclolectivo> Put([FromBody] ciclolectivo cicloLectivo, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CicloLectivoConexion<ciclolectivo>.Instance.Update(cicloLectivo);
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
        CicloLectivoConexion<ciclolectivo>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<ciclolectivo> GetCicloLectivos([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        /*  if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        { */
        return CicloLectivoConexion<ciclolectivo>.Instance.SearchAll(arrayfiltros);
        /* }
        else return null; */
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public ciclolectivo GetCCicloLectivo(int id, [FromHeader] string token)
    {
         if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return CicloLectivoConexion<ciclolectivo>.Instance.SearchId(id);
        }
        else return null;
    }
}

