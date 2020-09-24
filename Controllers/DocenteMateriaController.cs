using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteMateriaController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<docentemateria> Index([FromBody] docentemateria docenteMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            docenteMateria.Idciclolectivo =
               CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            DocenteMateriaConexion<docentemateria>.Instance.Insert(docenteMateria);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<docentemateria> Put([FromBody] docentemateria docenteMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            docenteMateria.Idciclolectivo =
                CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            DocenteMateriaConexion<docentemateria>.Instance.Update(docenteMateria);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string filtro, [FromHeader] string valor, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            DocenteMateriaConexion<docentemateria>.Instance.Delete(Convert.ToInt32(id), null, filtro, valor);
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<docentemateria> GetdocenteMaterias([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DocenteMateriaConexion<docentemateria>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docentemateria GetdocenteMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DocenteMateriaConexion<docentemateria>.Instance.SearchId(id);
        }
        else return null;
    }
}

