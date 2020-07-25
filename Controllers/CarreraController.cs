using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CarreraController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<carrera> Index([FromBody] carrera carrera)
    {
        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        CarreraConexion<carrera>.Instance.Insert(carrera);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<carrera> Put([FromBody] carrera carrera)
    {

        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        CarreraConexion<carrera>.Instance.Update(carrera);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        CarreraConexion<carrera>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<carrera> Getcarreras()
    {
        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        return CarreraConexion<carrera>.Instance.SearchAll();
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public carrera Getcarrera(int id)
    {
        //ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
        return CarreraConexion<carrera>.Instance.SearchId(id);
    }
}

