using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class LugarController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<lugar> Index([FromBody] lugar Lugar)
    {
        LugarConexion<lugar>.Instance.Insert(Lugar);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<lugar> Put([FromBody] lugar Lugar)
    {
        LugarConexion<lugar>.Instance.Update(Lugar);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        LugarConexion<lugar>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<lugar> Getlugares([FromHeader]string[] arrayfiltros)
    {
        return LugarConexion<lugar>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public lugar Getlugar(int id)
    {
        return LugarConexion<lugar>.Instance.SearchId(id);
    }
}

