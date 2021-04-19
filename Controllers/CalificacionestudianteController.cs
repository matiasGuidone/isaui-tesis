using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CalificacionestudianteController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<calificacionestudiante> Index([FromBody] calificacionestudiante Calificacionestudiante, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            //
            var filtro = new List<string>();
            var idciclo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            var idmateria = ExamenConexion<examen>.Instance.SearchId(Calificacionestudiante.Idexamen).Idmateria;
            filtro.Add("idestudiante");
            filtro.Add(Calificacionestudiante.Idestudiante.ToString());
            filtro.Add("idmateria");
            filtro.Add(idmateria.ToString());
            filtro.Add("idciclolectivo");
            filtro.Add(idciclo.ToString());
            var n = estudianteMateriaConexion<estudiantemateria>.Instance.SearchAll(filtro.ToArray());

            if(n.Count == 0){
                var esmat = new estudiantemateria();
                esmat.Idciclolectivo = idciclo;
                esmat.Idestudiante = Calificacionestudiante.Idestudiante;
                esmat.Idmateria = idmateria;
                estudianteMateriaConexion<estudiantemateria>.Instance.Insert(esmat);
            }
            CalificacionestudianteConexion<calificacionestudiante>.Instance.Insert(Calificacionestudiante);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<calificacionestudiante> Put([FromBody] calificacionestudiante Calificacionestudiante, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CalificacionestudianteConexion<calificacionestudiante>.Instance.Update(Calificacionestudiante);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CalificacionestudianteConexion<calificacionestudiante>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
        // ControlTablasAvisos.Instance.Delete(id);
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<calificacionestudiante> Getcalificacionestudiantes([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
         if(arrayfiltros.Any(p => p == "ids-examenes")){
             return CalificacionestudianteConexion<calificacionestudiante>.Instance.SearchExamenes(arrayfiltros);
         }
         else{ return CalificacionestudianteConexion<calificacionestudiante>.Instance.SearchAll(arrayfiltros);}
         }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public calificacionestudiante Getcalificacionestudiante(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return CalificacionestudianteConexion<calificacionestudiante>.Instance.SearchId(id);
        }
        else return null;
    }
}

