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
    public ActionResult<horasmateria> Index([FromBody] horasmateria HorasMateria)
    {
        HorasMateriaConexion<horasmateria>.Instance.InsertHoramateria(HorasMateria);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<horasmateria> Put([FromBody] horasmateria HorasMateria)
    {
        HorasMateriaConexion<horasmateria>.Instance.Update(HorasMateria);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
         HorasMateriaConexion<horasmateria>.Instance.DeleteHoramateria(Convert.ToInt32(id));
        return Json("registro eliminado"); 

    }

    //GET
    [HttpGet]
    public IEnumerable<horasmateria> GetHorasMaterias([FromHeader]string[] arrayfiltros)
    {
        return HorasMateriaConexion<horasmateria>.Instance.SearchAll(arrayfiltros," AND activo = 1 ");
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public horasmateria GetHorasMateria(int id)
    {
         return HorasMateriaConexion<horasmateria>.Instance.SearchId(id);
    }
}

