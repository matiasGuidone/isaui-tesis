using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CursoController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<curso> Index([FromBody] curso Curso)
    {
        //ObjetoConexion<Curso> cone = new ObjetoConexion<Curso>(new Curso());
        CursoConexion<curso>.Instance.Insert(Curso);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<curso> Put([FromBody] curso Curso)
    {

        //ObjetoConexion<Curso> cone = new ObjetoConexion<Curso>(new Curso());
        CursoConexion<curso>.Instance.Update(Curso);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        CursoConexion<curso>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<curso> GetCursos()
    {
        return CursoConexion<curso>.Instance.SearchAll();
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curso GetCurso(int id)
    {
        return CursoConexion<curso>.Instance.SearchId(id);
    }
}

