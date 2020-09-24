using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CurriculumantecedenteController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<curriculumantecedente> Index([FromBody] curriculumantecedente Curriculumantecedente, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CurriculumantecedenteConexion<curriculumantecedente>.Instance.Insert(Curriculumantecedente);
            return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<curriculumantecedente> Put([FromBody] curriculumantecedente Curriculumantecedente, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {

            CurriculumantecedenteConexion<curriculumantecedente>.Instance.Update(Curriculumantecedente);
            return Json("Guardado exitoso");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            CurriculumantecedenteConexion<curriculumantecedente>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<curriculumantecedente> Getcurriculumantecedentes([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CurriculumantecedenteConexion<curriculumantecedente>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curriculumantecedente Getcurriculumantecedente(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CurriculumantecedenteConexion<curriculumantecedente>.Instance.SearchId(id);
        }
        else return null;
    }
}

