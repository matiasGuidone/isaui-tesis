using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CursoAlumnoController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<cursoalumno> Index([FromBody] cursoalumno CurAlu)
    {
         CurAlu.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        CursoAlumnoConexion<cursoalumno>.Instance.Insert(CurAlu);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<cursoalumno> Put([FromBody] cursoalumno CurAlu)
    {
        CurAlu.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        CursoAlumnoConexion<cursoalumno>.Instance.Update(CurAlu);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id,[FromHeader]string filtro,[FromHeader]string valor)
    {
        CursoAlumnoConexion<cursoalumno>.Instance.Delete(Convert.ToInt32(id), null, filtro, valor);
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<cursoalumno> GetdocenteMaterias([FromHeader]string[] arrayfiltros)
    {
        return CursoAlumnoConexion<cursoalumno>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public cursoalumno GetdocenteMateria(int id)
    {
        return CursoAlumnoConexion<cursoalumno>.Instance.SearchId(id);
    }
}

