using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class estudianteMateriaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<estudiantemateria> Index([FromBody] estudiantemateria estudianteMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        estudianteMateria.Idciclolectivo = 
        CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        estudianteMateriaConexion<estudiantemateria>.Instance.Insert(estudianteMateria);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<estudiantemateria> Put([FromBody] estudiantemateria estudianteMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        estudianteMateria.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        estudianteMateriaConexion<estudiantemateria>.Instance.Update(estudianteMateria);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id,[FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        if (arrayfiltros.Any(p => p == "idcurso")){
             estudianteMateriaConexion<estudiantemateria>.Instance.DeleteByCurso(Convert.ToInt32(arrayfiltros[1]));
            return Json("registro eliminado");
        }
        else{
            estudianteMateriaConexion<estudiantemateria>.Instance.Delete(Convert.ToInt32(id), null, arrayfiltros);
            return Json("registro eliminado");}
            }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<estudiantemateria> GetestudianteMaterias([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return estudianteMateriaConexion<estudiantemateria>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public estudiantemateria GetestudianteMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return estudianteMateriaConexion<estudiantemateria>.Instance.SearchId(id);
        }
        else return null;
    }
}

