using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AlumnoMateriaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<alumnomateria> Index([FromBody] alumnomateria AlumnoMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        AlumnoMateria.Idciclolectivo = 
        CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        AlumnoMateriaConexion<alumnomateria>.Instance.Insert(AlumnoMateria);
        return Json("Guardado exitoso");
        }
        else return Json("...");
    }

    // PUT
    [HttpPut]
    public ActionResult<alumnomateria> Put([FromBody] alumnomateria AlumnoMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        AlumnoMateria.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        AlumnoMateriaConexion<alumnomateria>.Instance.Update(AlumnoMateria);
        return Json("Guardado exitoso");
        }
        else return Json("...");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id,[FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        if (arrayfiltros.Any(p => p == "idcurso")){
             AlumnoMateriaConexion<alumnomateria>.Instance.DeleteByCurso(Convert.ToInt32(arrayfiltros[1]));
            return Json("registro eliminado");
        }
        else{
            AlumnoMateriaConexion<alumnomateria>.Instance.Delete(Convert.ToInt32(id), null, arrayfiltros);
            return Json("registro eliminado");}
            }
        else return Json("...");
    }

    //GET
    [HttpGet]
    public IEnumerable<alumnomateria> GetAlumnoMaterias([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return AlumnoMateriaConexion<alumnomateria>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public alumnomateria GetAlumnoMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return AlumnoMateriaConexion<alumnomateria>.Instance.SearchId(id);
        }
        else return null;
    }
}

