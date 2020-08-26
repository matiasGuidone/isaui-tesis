using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CurriculumconvocatoriaController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<curriculumconvocatoria> Index([FromBody] curriculumconvocatoria Curriculumconvocatoria)
    {
        CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.Insert(Curriculumconvocatoria);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<curriculumconvocatoria> Put([FromBody] curriculumconvocatoria Curriculumconvocatoria)
    {

        CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.Update(Curriculumconvocatoria);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<curriculumconvocatoria> Getcurriculumconvocatorias([FromHeader]string[] arrayfiltros)
    {
        
        return CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curriculumconvocatoria Getcurriculumconvocatoria(int id)
    {
      
        return CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.SearchId(id);
    }
}

