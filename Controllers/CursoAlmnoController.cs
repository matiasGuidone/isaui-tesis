using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CursoAlumnoController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<cursoalumno> Index([FromBody] cursoalumno CurAlu, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CurAlu.Idciclolectivo =
               CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            CursoAlumnoConexion<cursoalumno>.Instance.Insert(CurAlu);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<cursoalumno> Put([FromBody] cursoalumno CurAlu, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CurAlu.Idciclolectivo =
                CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            CursoAlumnoConexion<cursoalumno>.Instance.Update(CurAlu);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string filtro, [FromHeader] string valor, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CursoAlumnoConexion<cursoalumno>.Instance.Delete(Convert.ToInt32(id), null, filtro, valor);
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<cursoalumno> GetdocenteMaterias([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CursoAlumnoConexion<cursoalumno>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public cursoalumno GetdocenteMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CursoAlumnoConexion<cursoalumno>.Instance.SearchId(id);
        }
        else return null;
    }
}

