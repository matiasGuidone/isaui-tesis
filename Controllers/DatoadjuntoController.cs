using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DatoadjuntoController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<datoadjunto> Index([FromBody] datoadjunto datoadjunto)
    {
        DatoadjuntoConexion<datoadjunto>.Instance.Insert(datoadjunto);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<datoadjunto> Put([FromBody] datoadjunto datoadjunto)
    {

        DatoadjuntoConexion<datoadjunto>.Instance.Update(datoadjunto);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        DatoadjuntoConexion<datoadjunto>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<datoadjunto> Getdatoadjuntos([FromHeader]string[] arrayfiltros)
    {
        
        return DatoadjuntoConexion<datoadjunto>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public datoadjunto Getdatoadjunto(int id)
    {
      
        return DatoadjuntoConexion<datoadjunto>.Instance.SearchId(id);
    }
}

