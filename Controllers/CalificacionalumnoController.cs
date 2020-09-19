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
    public ActionResult<calificacionalumno> Index([FromBody] calificacionalumno Calificacionalumno)
    {
        //ObjetoConexion<calificacionalumno> cone = new ObjetoConexion<calificacionalumno>(new calificacionalumno());
        CalificacionalumnoConexion<calificacionalumno>.Instance.Insert(Calificacionalumno);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<calificacionalumno> Put([FromBody] calificacionalumno Calificacionalumno)
    {

        //ObjetoConexion<calificacionalumno> cone = new ObjetoConexion<calificacionalumno>(new calificacionalumno());
        CalificacionalumnoConexion<calificacionalumno>.Instance.Update(Calificacionalumno);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<calificacionalumno> cone = new ObjetoConexion<calificacionalumno>(new calificacionalumno());
        CalificacionalumnoConexion<calificacionalumno>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<calificacionalumno> Getcalificacionalumnos([FromHeader]string[] arrayfiltros)
    {
         if(arrayfiltros.Any(p => p == "ids-examenes")){
             return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchExamenes(arrayfiltros);
         }
         else{ return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchAll(arrayfiltros);}
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public calificacionalumno Getcalificacionalumno(int id)
    {
        //ObjetoConexion<calificacionalumno> cone = new ObjetoConexion<calificacionalumno>(new calificacionalumno());
        return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchId(id);
    }
}

