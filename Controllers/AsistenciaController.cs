using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AsistenciaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<asistencia> Index([FromBody] asistencia asistencia)
    {
        //ObjetoConexion<asistencia> cone = new ObjetoConexion<asistencia>(new asistencia());
        AsistenciaConexion<asistencia>.Instance.Insert(asistencia);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<asistencia> Put([FromBody] asistencia asistencia)
    {

        //ObjetoConexion<asistencia> cone = new ObjetoConexion<asistencia>(new asistencia());
        AsistenciaConexion<asistencia>.Instance.Update(asistencia);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<asistencia> cone = new ObjetoConexion<asistencia>(new asistencia());
        AsistenciaConexion<asistencia>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<asistencia> Getalumnos([FromHeader]string[] arrayfiltros)
    {
        //ObjetoConexion<asistencia> cone = new ObjetoConexion<asistencia>(new asistencia());
        
        return AsistenciaConexion<asistencia>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public asistencia Getalumno(int id)
    {
        //ObjetoConexion<asistencia> cone = new ObjetoConexion<asistencia>(new asistencia());
        return AsistenciaConexion<asistencia>.Instance.SearchId(id);
    }
}

