using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class UsuarioController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<usuario> Index([FromBody] usuario usuario)
    {
        UsuarioConexion<usuario>.Instance.Insert(usuario);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<usuario> Put([FromBody] usuario usuario)
    {
        UsuarioConexion<usuario>.Instance.Update(usuario);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        UsuarioConexion<usuario>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<usuario> Getusuarios([FromHeader]string[] arrayfiltros)
    {
        return UsuarioConexion<usuario>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public usuario Getusuario(int id)
    {
        return UsuarioConexion<usuario>.Instance.SearchId(id);
    }
}

