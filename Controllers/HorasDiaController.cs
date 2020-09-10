using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class HorasDiaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<horasdia> Index([FromBody] horasdia HorasDia)
    {
        HorasDiaConexion.Instance.Insert(HorasDia);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<horasdia> Put([FromBody] horasdia HorasDia)
    {
        HorasDiaConexion.Instance.Update(HorasDia);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
         HorasDiaConexion.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado"); 

    }

    //GET
    [HttpGet]
    public IEnumerable<horasdia> GetHorasDias([FromHeader]string[] arrayfiltros)
    {
        return HorasDiaConexion.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public horasdia GetHorasDia(int id)
    {
         return HorasDiaConexion.Instance.SearchId(id);
    }
}

