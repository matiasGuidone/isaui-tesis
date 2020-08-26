using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CurriculumController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<curriculum> Index([FromBody] curriculum Curriculum)
    {
        CurriculumConexion<curriculum>.Instance.Insert(Curriculum);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<curriculum> Put([FromBody] curriculum Curriculum)
    {

        CurriculumConexion<curriculum>.Instance.Update(Curriculum);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        CurriculumConexion<curriculum>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<curriculum> Getcurriculums([FromHeader]string[] arrayfiltros)
    {
        
        return CurriculumConexion<curriculum>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curriculum Getcurriculum(int id)
    {
      
        return CurriculumConexion<curriculum>.Instance.SearchId(id);
    }
}

