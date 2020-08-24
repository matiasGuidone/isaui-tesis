using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class PublicacionController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<publicacion> Index([FromBody] publicacion Publicacion)
    {
        //ObjetoConexion<publicacion> cone = new ObjetoConexion<publicacion>(new publicacion());
        PublicacionConexion<publicacion>.Instance.Insert(Publicacion);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<publicacion> Put([FromBody] publicacion Publicacion)
    {

        //ObjetoConexion<publicacion> cone = new ObjetoConexion<publicacion>(new publicacion());
        PublicacionConexion<publicacion>.Instance.Update(Publicacion);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        //ObjetoConexion<publicacion> cone = new ObjetoConexion<publicacion>(new publicacion());
        PublicacionConexion<publicacion>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);

    }

    //GET
    [HttpGet]
    public IEnumerable<publicacion> getpublicacions([FromHeader]string[] arrayfiltros)
    {
        //ObjetoConexion<publicacion> cone = new ObjetoConexion<publicacion>(new publicacion());
        
        return PublicacionConexion<publicacion>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public publicacion getpublicacion(int id)
    {
        //ObjetoConexion<publicacion> cone = new ObjetoConexion<publicacion>(new publicacion());
        return PublicacionConexion<publicacion>.Instance.SearchId(id);
    }
}

