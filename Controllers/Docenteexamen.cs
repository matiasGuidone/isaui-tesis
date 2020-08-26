using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteexamenController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<docenteexamen> Index([FromBody] docenteexamen Docenteexamen)
    {
        DocenteexamenConexion<docenteexamen>.Instance.Insert(Docenteexamen);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<docenteexamen> Put([FromBody] docenteexamen Docenteexamen)
    {

        DocenteexamenConexion<docenteexamen>.Instance.Update(Docenteexamen);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        DocenteexamenConexion<docenteexamen>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<docenteexamen> Getdocenteexamens([FromHeader]string[] arrayfiltros)
    {
        
        return DocenteexamenConexion<docenteexamen>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docenteexamen Getdocenteexamen(int id)
    {
      
        return DocenteexamenConexion<docenteexamen>.Instance.SearchId(id);
    }
}

