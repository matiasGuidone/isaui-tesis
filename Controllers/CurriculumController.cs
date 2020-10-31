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
    public ActionResult<curriculum> Index([FromBody] curriculum Curriculum, [FromHeader] string token)
    {
        var user = UsuarioConexion<usuario>.Instance.getIdUserToken(token);
        if (user != 0)
        {
            Curriculum.Idusuario = user;
            return Json(CurriculumConexion<curriculum>.Instance.Insert(Curriculum));
            //return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<curriculum> Put([FromBody] curriculum Curriculum, [FromHeader] string token)
    {
        var user = UsuarioConexion<usuario>.Instance.getIdUserToken(token);
        if (user!=0)
        {
            Curriculum.Idusuario = user;
            CurriculumConexion<curriculum>.Instance.Update(Curriculum);
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
            CurriculumConexion<curriculum>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<curriculum> Getcurriculums([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            if (arrayfiltros.Any(p => p == "idusuario"))
            {
                string[] filtro = { "idusuario", UsuarioConexion<usuario>.Instance.getIdUserToken(token).ToString() };
                var cvs =CurriculumConexion<curriculum>.Instance.SearchAll(filtro);
                return cvs;
            }
            else
            {
                return CurriculumConexion<curriculum>.Instance.SearchAll(arrayfiltros);
            }
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curriculum Getcurriculum(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CurriculumConexion<curriculum>.Instance.SearchId(id);
        }
        else return null;
    }
}

