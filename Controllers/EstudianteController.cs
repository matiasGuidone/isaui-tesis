using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class estudianteController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<estudiante> Index([FromBody] estudiante estudiante, [FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            estudianteConexion<estudiante>.Instance.Insert(estudiante);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<estudiante> Put([FromBody] estudiante estudiante, [FromHeader] string token)
    {
         
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            estudianteConexion<estudiante>.Instance.Update(estudiante);
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
            estudianteConexion<estudiante>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<estudiante> Getestudiantes([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            if (arrayfiltros.Any(p => p == "idcurso"))
            {
                return estudianteConexion<estudiante>.Instance.SearchestudiantesCurso(Convert.ToInt32(arrayfiltros[1]));
            }
            else if (arrayfiltros.Any(p => p == "idmateria"))
            {
               // return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1]));
                if (arrayfiltros.Length==2)
                return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1])); 
                if (arrayfiltros.Length==4)
                return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1]),Convert.ToInt32(arrayfiltros[3]));
            }
            else
            {
                return estudianteConexion<estudiante>.Instance.SearchAll(arrayfiltros);
            }
        }
        return null;// default(List<estudiante>);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public estudiante Getestudiante(int id, [FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return estudianteConexion<estudiante>.Instance.SearchId(id);
        }
        else return null;
    }
}

