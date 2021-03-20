using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class HorasMateriaController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<horasmateria> Index([FromBody] horasmateria HorasMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            HorasMateriaConexion<horasmateria>.Instance.InsertHoramateria(HorasMateria);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<horasmateria> Put([FromBody] horasmateria HorasMateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            HorasMateriaConexion<horasmateria>.Instance.Update(HorasMateria);
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
            HorasMateriaConexion<horasmateria>.Instance.DeleteHoramateria(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<horasmateria> GetHorasMaterias([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return HorasMateriaConexion<horasmateria>.Instance.SearchAll(arrayfiltros, " AND activo = 1 ");
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public horasmateria GetHorasMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return HorasMateriaConexion<horasmateria>.Instance.SearchId(id);
        }
        else return null;
    }
}

