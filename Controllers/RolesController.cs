using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class RolesController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<roles> Index([FromBody] roles roles)
    {
        //ObjetoConexion<roles> cone = new ObjetoConexion<roles>(new roles());
        RolesConexion<roles>.Instance.Insert(roles);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<roles> Put([FromBody] roles roles)
    {

        //ObjetoConexion<roles> cone = new ObjetoConexion<roles>(new roles());
        RolesConexion<roles>.Instance.Update(roles);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<roles> cone = new ObjetoConexion<roles>(new roles());
        RolesConexion<roles>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<roles> Getalumnos([FromHeader]string[] arrayfiltros)
    {
        //ObjetoConexion<roles> cone = new ObjetoConexion<roles>(new roles());
        
        return RolesConexion<roles>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public roles Getalumno(int id)
    {
        //ObjetoConexion<roles> cone = new ObjetoConexion<roles>(new roles());
        return RolesConexion<roles>.Instance.SearchId(id);
    }
}

