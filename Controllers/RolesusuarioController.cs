using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class RolesusuarioController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<rolesusuario> Index([FromBody] rolesusuario Rolesusuario)
    {
        RolesusuarioConexion<rolesusuario>.Instance.Insert(Rolesusuario);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<rolesusuario> Put([FromBody] rolesusuario Rolesusuario)
    {

        RolesusuarioConexion<rolesusuario>.Instance.Update(Rolesusuario);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        RolesusuarioConexion<rolesusuario>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<rolesusuario> Getrolesusuarios([FromHeader]string[] arrayfiltros)
    {
        
        return RolesusuarioConexion<rolesusuario>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public rolesusuario Getrolesusuario(int id)
    {
      
        return RolesusuarioConexion<rolesusuario>.Instance.SearchId(id);
    }
}

