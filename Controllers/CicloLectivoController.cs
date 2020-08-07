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
    public ActionResult<ciclolectivo> addCicloLectivo([FromBody] ciclolectivo cicloLectivo)
    {
        //ObjetoConexion<Curso> cone = new ObjetoConexion<Curso>(new Curso());
        CicloLectivoConexion<ciclolectivo>.Instance.Insert(cicloLectivo);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<ciclolectivo> Put([FromBody] ciclolectivo cicloLectivo)
    {

        //ObjetoConexion<Curso> cone = new ObjetoConexion<Curso>(new Curso());
        CicloLectivoConexion<ciclolectivo>.Instance.Update(cicloLectivo);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        CicloLectivoConexion<ciclolectivo>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<ciclolectivo> GetCicloLectivos()
    {
        return CicloLectivoConexion<ciclolectivo>.Instance.SearchAll();
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public ciclolectivo GetCCicloLectivo(int id)
    {
        return CicloLectivoConexion<ciclolectivo>.Instance.SearchId(id);
    }
}

