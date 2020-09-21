using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AlumnoController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<alumno> Index([FromBody] alumno alumno, [FromHeader] string token)
    {
        string[] filtro = { "token", token };
        var user = UsuarioConexion<usuario>.Instance.getUserToken(token);
        if (user.Count == 1)
        {
            AlumnoConexion<alumno>.Instance.Insert(alumno);
            return Json("Guardado exitoso");
        }
        else return Json("...");
    }

    // PUT
    [HttpPut]
    public ActionResult<alumno> Put([FromBody] alumno alumno, [FromHeader] string token)
    {
        string[] filtro = { "token", token };
        var user = UsuarioConexion<usuario>.Instance.getUserToken(token);
        if (user.Count == 1)
        {
            AlumnoConexion<alumno>.Instance.Update(alumno);
            return Json("Guardado exitoso");
        }
        else return Json("...");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        string[] filtro = { "token", token };
        var user = UsuarioConexion<usuario>.Instance.getUserToken(token);
        if (user.Count == 1)
        {
            AlumnoConexion<alumno>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return Json("...");

    }

    //GET
    [HttpGet]
    public IEnumerable<alumno> Getalumnos([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        string[] filtro = { "token", token };
        var user = UsuarioConexion<usuario>.Instance.getUserToken(token);
        if (user.Count == 1)
        {
            if (arrayfiltros.Any(p => p == "idcurso"))
            {
                return AlumnoConexion<alumno>.Instance.SearchAlumnosCurso(Convert.ToInt32(arrayfiltros[1]));
            }
            else if (arrayfiltros.Any(p => p == "idmateria"))
            {
                return AlumnoConexion<alumno>.Instance.SearchAlumnosMateria(Convert.ToInt32(arrayfiltros[1]));
            }
            else
            {
                return AlumnoConexion<alumno>.Instance.SearchAll(arrayfiltros);
            }
        }
        else return null;// default(List<alumno>);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public alumno Getalumno(int id, [FromHeader] string token)
    {
        string[] filtro = { "token", token };
        var user = UsuarioConexion<usuario>.Instance.getUserToken(token);
        if (user.Count == 1)
        {
            return AlumnoConexion<alumno>.Instance.SearchId(id);
        }
        else return null;
    }
}

