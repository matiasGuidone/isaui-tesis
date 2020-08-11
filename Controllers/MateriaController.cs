using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class MateriaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<materia> Index([FromBody] materia Materia)
    {
        MateriaConexion<materia>.Instance.Insert(Materia);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<materia> Put([FromBody] materia Materia)
    {
        MateriaConexion<materia>.Instance.Update(Materia);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        MateriaConexion<materia>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<materia> GetMaterias([FromHeader]string[] arrayfiltros)
    {
        return MateriaConexion<materia>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public materia GetMateria(int id)
    {
        return MateriaConexion<materia>.Instance.SearchId(id);
    }
}

