using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<docente> Index([FromBody] docente docente)
    {
        //ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
        DocenteConexion<docente>.Instance.Insert(docente);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<docente> Put([FromBody] docente docente)
    {

        //ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
        DocenteConexion<docente>.Instance.Update(docente);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
        DocenteConexion<docente>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<docente> Getdocentes([FromHeader]string[] arrayfiltros)
    {
        //ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
        // if(dato!=null)
        // {
        // return DocenteConexion<docente>.Instance.serchDniLastName(dato);
        // }
        // else
        return DocenteConexion<docente>.Instance.SearchAll(arrayfiltros);
    
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docente Getdocente(int id)
    {
        //ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
        return DocenteConexion<docente>.Instance.SearchId(id);
    }


  
}

