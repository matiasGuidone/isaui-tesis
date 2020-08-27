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
    public ActionResult<alumnomateria> Index([FromBody] alumnomateria AlumnoMateria)
    {
        AlumnoMateria.Idciclolectivo = 
        CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        AlumnoMateriaConexion<alumnomateria>.Instance.Insert(AlumnoMateria);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<alumnomateria> Put([FromBody] alumnomateria AlumnoMateria)
    {
        AlumnoMateria.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        AlumnoMateriaConexion<alumnomateria>.Instance.Update(AlumnoMateria);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id,[FromHeader]string filtro,[FromHeader]string valor)
    {
        if (filtro == "idcurso"){
             AlumnoMateriaConexion<alumnomateria>.Instance.DeleteByCurso(Convert.ToInt32(valor));
            return Json("registro eliminado");
        }
        else{
            AlumnoMateriaConexion<alumnomateria>.Instance.Delete(Convert.ToInt32(id), null, filtro, valor);
            return Json("registro eliminado");}
    }

    //GET
    [HttpGet]
    public IEnumerable<alumnomateria> GetAlumnoMaterias([FromHeader]string[] arrayfiltros)
    {
        return AlumnoMateriaConexion<alumnomateria>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public alumnomateria GetAlumnoMateria(int id)
    {
        return AlumnoMateriaConexion<alumnomateria>.Instance.SearchId(id);
    }
}

