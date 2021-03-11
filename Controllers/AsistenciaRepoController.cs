using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AsistenciaRepoController : Controller
{
    
    // // POST
    // [HttpPost]
    // public ActionResult<asistencia> Index([FromBody] asistencia[] Asistencia, [FromHeader] string token)
    // {
    //      if (UsuarioConexion<usuario>.Instance.getUserToken(token))
    //     {
    //     foreach(var asisten in Asistencia ){
    //         AsistenciaConexion<asistencia>.Instance.Insert(asisten);
    //     }
    //     return Json("Guardado exitoso");
    //      }
    //     else return null;

    // }

    // // PUT
    // [HttpPut]
    // public ActionResult<asistencia> Put([FromBody] asistencia Asistencia, [FromHeader] string token)
    // {
    //     if (UsuarioConexion<usuario>.Instance.getUserToken(token))
    //     {
    //     AsistenciaConexion<asistencia>.Instance.Update(Asistencia);
    //     return Json("Guardado exitoso");
    //      }
    //     else return null;
    // }

    // // DELETE
    // [HttpDelete]
    // public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    // {
    //     if (UsuarioConexion<usuario>.Instance.getUserToken(token))
    //     {
    //     AsistenciaConexion<asistencia>.Instance.Delete(Convert.ToInt32(id));
    //     return Json("registro eliminado"); 
    //      }
    //     else return null;

    // }

    //GET
    [HttpGet]
    public IEnumerable<asistenciarepo> Getasistencias([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {
       if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            
        string nombreape = null;
        var fechad = default(DateTime);
        var fechah = default(DateTime); 
        var idcurso = default(Int32);
        var idmateria = default(Int32);
        var idestudiante = default(Int32);
        var totales = false;
        if(arrayfiltros.Length > 1){
            for (int i =0; i < arrayfiltros.Length;i++){
                // "Nombre/Apellido estudiante":"", "Carrera":"","Curso":"","fecha desde": "","fecha hasta":""
                switch (arrayfiltros[i])
                {
                    case "Nombre/Apellido estudiante":
                        nombreape = arrayfiltros[i+1];
                        break;
                    case "idcurso":
                        idcurso = Convert.ToInt32(arrayfiltros[i+1]);
                        break;
                    case "idestudiante":
                        idestudiante = Convert.ToInt32(arrayfiltros[i+1]);
                        break;
                    case "idmateria":
                        idmateria = Convert.ToInt32(arrayfiltros[i+1]);
                        break;
                    case "fecha desde":
                        fechad = Convert.ToDateTime(arrayfiltros[i+1]);
                        break;
                    case "fecha hasta":
                        fechah = Convert.ToDateTime(arrayfiltros[i+1]);
                        break;
                    case "totales":
                        totales = true;
                        break;

                    default: break;
                }  

                }
                 
            }
        return AsistenciaConexion<asistenciarepo>.Instance.ReporteAsistencias(fechad,fechah,idcurso,idmateria,nombreape, totales, idestudiante);
          }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public asistencia Getasistencia(int id, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return AsistenciaConexion<asistencia>.Instance.SearchId(id);
         }
        else return null;
    }
}

