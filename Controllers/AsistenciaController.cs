using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AsistenciaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<asistencia> Index([FromBody] asistencia[] Asistencia, [FromHeader] string token)
    {
         if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        foreach(var asisten in Asistencia ){
            AsistenciaConexion<asistencia>.Instance.Insert(asisten);
        }
        return Json("El proceso de almacenado se realizó con éxito.");
         }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<asistencia> Put([FromBody] asistencia Asistencia, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        AsistenciaConexion<asistencia>.Instance.Update(Asistencia);
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
        AsistenciaConexion<asistencia>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado"); 
         }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<asistencia> Getasistencias([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        if(arrayfiltros.Any(p => p == "idmateria")){
            return AsistenciaConexion<asistencia>.Instance.SearchPorMateria(Convert.ToInt32(arrayfiltros[1]));
        }
        else{
        return AsistenciaConexion<asistencia>.Instance.SearchAll(arrayfiltros);
        }
         }
        else return null;
    }

    // GET: api/ApiWithActions/5
    // [HttpGet("{id}")]
    // public asistencia Getasistencia(int id, [FromHeader] string token)
    // { 
    //     if (UsuarioConexion<usuario>.Instance.getUserToken(token))
    //     {
    //     return AsistenciaConexion<asistencia>.Instance.SearchId(id);
    //      }
    //     else return null;
    // }
}

