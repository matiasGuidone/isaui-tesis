using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AntecedentetituloController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<antecedentetitulo> Index([FromBody] antecedentetitulo antecedentetitulo)
    {
        AntecedentetituloConexion<antecedentetitulo>.Instance.Insert(antecedentetitulo);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<antecedentetitulo> Put([FromBody] antecedentetitulo antecedentetitulo)
    {

        AntecedentetituloConexion<antecedentetitulo>.Instance.Update(antecedentetitulo);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        AntecedentetituloConexion<antecedentetitulo>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<antecedentetitulo> Getantecedentetitulos([FromHeader]string[] arrayfiltros)
    {
        
        return AntecedentetituloConexion<antecedentetitulo>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public antecedentetitulo Getantecedentetitulo(int id)
    {
      
        return AntecedentetituloConexion<antecedentetitulo>.Instance.SearchId(id);
    }
}

