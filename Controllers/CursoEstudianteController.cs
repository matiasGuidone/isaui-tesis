using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CursoestudianteController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<cursoestudiante> Index([FromBody] cursoestudiante CurAlu, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CurAlu.Idciclolectivo =
               CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            CursoestudianteConexion<cursoestudiante>.Instance.Insert(CurAlu);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<cursoestudiante> Put([FromBody] cursoestudiante CurAlu, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CurAlu.Idciclolectivo =
                CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            CursoestudianteConexion<cursoestudiante>.Instance.Update(CurAlu);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CursoestudianteConexion<cursoestudiante>.Instance.Delete(Convert.ToInt32(id), null, arrayfiltros);
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<cursoestudiante> GetdocenteMaterias([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CursoestudianteConexion<cursoestudiante>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public cursoestudiante GetdocenteMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CursoestudianteConexion<cursoestudiante>.Instance.SearchId(id);
        }
        else return null;
    }
}

