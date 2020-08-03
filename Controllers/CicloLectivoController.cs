using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CicloLectivoController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<cicloLectivo> addCicloLectivo([FromBody] cicloLectivo cicloLectivo)
    {
        //ObjetoConexion<Curso> cone = new ObjetoConexion<Curso>(new Curso());
        CicloLectivoConexion<cicloLectivo>.Instance.Insert(cicloLectivo);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<cicloLectivo> Put([FromBody] cicloLectivo cicloLectivo)
    {

        //ObjetoConexion<Curso> cone = new ObjetoConexion<Curso>(new Curso());
        CicloLectivoConexion<cicloLectivo>.Instance.Update(cicloLectivo);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        CicloLectivoConexion<cicloLectivo>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<cicloLectivo> GetCicloLectivos()
    {
        return CicloLectivoConexion<cicloLectivo>.Instance.SearchAll();
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public cicloLectivo GetCCicloLectivo(int id)
    {
        return CicloLectivoConexion<cicloLectivo>.Instance.SearchId(id);
    }
}

