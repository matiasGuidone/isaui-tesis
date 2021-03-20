using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class ExamenController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<examen> Index([FromBody] examen Examen, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            Examen.Idciclolectivo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            ExamenConexion<examen>.Instance.Insert(Examen);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<examen> Put([FromBody] examen Examen, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            ExamenConexion<examen>.Instance.Update(Examen);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            ExamenConexion<examen>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<examen> GetExamen([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            //preguntar si los filtros tienen idestudiante => alternativa 
            return ExamenConexion<examen>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public examen GetExamen(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return ExamenConexion<examen>.Instance.SearchId(id);
        }
        else return null;
    }
}

