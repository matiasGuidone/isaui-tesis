using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CalificacionalumnoController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<calificacionalumno> Index([FromBody] calificacionalumno Calificacionalumno, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CalificacionalumnoConexion<calificacionalumno>.Instance.Insert(Calificacionalumno);
        return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<calificacionalumno> Put([FromBody] calificacionalumno Calificacionalumno, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CalificacionalumnoConexion<calificacionalumno>.Instance.Update(Calificacionalumno);
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
        CalificacionalumnoConexion<calificacionalumno>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<calificacionalumno> Getcalificacionalumnos([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
         if(arrayfiltros.Any(p => p == "ids-examenes")){
             return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchExamenes(arrayfiltros);
         }
         else{ return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchAll(arrayfiltros);}
         }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public calificacionalumno Getcalificacionalumno(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchId(id);
        }
        else return null;
    }
}

