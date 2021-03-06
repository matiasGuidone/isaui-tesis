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
    public ActionResult<curriculumconvocatoria> Index([FromBody] curriculumconvocatoria Curriculumconvocatoria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            string[] filtroaux= {"idcurriculum",Curriculumconvocatoria.Idcurriculum.ToString(),"idconvocatoria",Curriculumconvocatoria.Idconvocatoria.ToString()};
            var lista = CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.SearchAll(filtroaux);
            if(lista.Count==0){
                CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.Insert(Curriculumconvocatoria);
                return Json("El proceso de almacenado se realizó con éxito.");
            }
            else{
                CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.actualizarConvocatoria(Curriculumconvocatoria);
                return Json("El proceso de almacenado se realizó con éxito.");
            }
        
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<curriculumconvocatoria> Put([FromBody] curriculumconvocatoria Curriculumconvocatoria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.Update(Curriculumconvocatoria);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.Delete(Convert.ToInt32(id),null,arrayfiltros);
        return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<Object> Getcurriculumconvocatorias([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            if (arrayfiltros.Any(p => p == "usuariocurriculum")){

                string[] filtro = { "idusuario", UsuarioConexion<usuario>.Instance.getIdUserToken(token).ToString() };
                var idcv = CurriculumConexion<curriculum>.Instance.SearchAll(filtro)[0].Id;
                return CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.getDatosConvocatoriasCv(idcv);
            }
            else{
                return CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.SearchAll(arrayfiltros);}
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public curriculumconvocatoria Getcurriculumconvocatoria(int id, [FromHeader] string token)
    {
      if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return CurriculumconvocatoriaConexion<curriculumconvocatoria>.Instance.SearchId(id);
        }
        else return null;
    }
}

