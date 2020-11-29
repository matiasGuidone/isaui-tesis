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
    public ActionResult<convocatoria> Index([FromBody] convocatoria Convocatoria, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        ConvocatoriaConexion<convocatoria>.Instance.Insert(Convocatoria);
        return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<convocatoria> Put([FromBody] convocatoria Convocatoria, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        ConvocatoriaConexion<convocatoria>.Instance.Update(Convocatoria);
        return Json("Guardado exitoso");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        ConvocatoriaConexion<convocatoria>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado"); 
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<convocatoria> Getconvocatorias([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            if(arrayfiltros.Any(p => p == "convocatoriascv")){
                return ConvocatoriaConexion<convocatoria>.Instance.SearchActivas();
            } 
        return ConvocatoriaConexion<convocatoria>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public convocatoria Getconvocatoria(int id, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return ConvocatoriaConexion<convocatoria>.Instance.SearchId(id);
        }
        else return null;
    }


  
}

