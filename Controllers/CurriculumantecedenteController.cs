using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CurriculumantecedenteController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<curriculumantecedente> Index([FromBody] curriculumantecedente Curriculumantecedente)
    {
        CurriculumantecedenteConexion<curriculumantecedente>.Instance.Insert(Curriculumantecedente);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<curriculumantecedente> Put([FromBody] curriculumantecedente Curriculumantecedente)
    {

        CurriculumantecedenteConexion<curriculumantecedente>.Instance.Update(Curriculumantecedente);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        CurriculumantecedenteConexion<curriculumantecedente>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<curriculumantecedente> Getcurriculumantecedentes([FromHeader]string[] arrayfiltros)
    {
        
        return CurriculumantecedenteConexion<curriculumantecedente>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curriculumantecedente Getcurriculumantecedente(int id)
    {
      
        return CurriculumantecedenteConexion<curriculumantecedente>.Instance.SearchId(id);
    }
}

