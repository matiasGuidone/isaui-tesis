using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class ConvocatoriaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<convocatoria> Index([FromBody] convocatoria convocatoria)
    {
        //ObjetoConexion<convocatoria> cone = new ObjetoConexion<convocatoria>(new convocatoria());
        ConvocatoriaConexion<convocatoria>.Instance.Insert(convocatoria);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<convocatoria> Put([FromBody] convocatoria convocatoria)
    {

        //ObjetoConexion<convocatoria> cone = new ObjetoConexion<convocatoria>(new convocatoria());
        ConvocatoriaConexion<convocatoria>.Instance.Update(convocatoria);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<convocatoria> cone = new ObjetoConexion<convocatoria>(new convocatoria());
        ConvocatoriaConexion<convocatoria>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<convocatoria> GetConvocatorias([FromHeader]string[] arrayfiltros)
    {
        //ObjetoConexion<convocatoria> cone = new ObjetoConexion<convocatoria>(new convocatoria());
        
        return ConvocatoriaConexion<convocatoria>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public convocatoria GetConvocatoria(int id)
    {
        //ObjetoConexion<convocatoria> cone = new ObjetoConexion<convocatoria>(new convocatoria());
        return ConvocatoriaConexion<convocatoria>.Instance.SearchId(id);
    }
}

