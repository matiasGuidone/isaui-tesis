using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;



[Route("api/[controller]")]

public class CalificacionRepoController : Controller
{
    [HttpGet]
    /*  public JsonResult GetJsonnota([FromHeader]string[] arrayfiltros, [FromHeader] string token)
        {

            var nombre="";
            var nota="";
            var tipoexamen="";
            var idestudiante="";
             var idmateria="";
             if(arrayfiltros.Length > 1){
                idestudiante=arrayfiltros[0];
                idmateria=arrayfiltros[1];
                }
            //preguntar si los filtros tienen idestudiante => alternativa 
             if (UsuarioConexion<usuario>.Instance.getUserToken(token)) // se fija si trae token
            { 
                nombre= CalificacionestudianteConexion<estudiante>.Instance.SerchMateriaestudiantes(Convert.ToInt32(idestudiante),Convert.ToInt32(idmateria)).ToString(); 
                nota= CalificacionestudianteConexion<estudiante>.Instance.SerchNotaestudiantes2(Convert.ToInt32(idestudiante),Convert.ToInt32(idmateria)).ToString(); 
                 tipoexamen= CalificacionestudianteConexion<estudiante>.Instance.SerchTipoEvaestudiantes(Convert.ToInt32(idestudiante),Convert.ToInt32(idmateria)).ToString(); 
                var consulta=Json("{ \"nombre\":\""+nombre+"\", \"tipoexamen\": \""+tipoexamen+"\":\"nota\": "+nota+"}");
                 return Json(consulta);   
             }
            else return null; 
        }
     */



    public IEnumerable<notarepo> Getnotas([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    // lista de "notarepo" trae lo q filtras y el token (verifica si esta logeado)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token)) // se fija si trae token
        {
//preguntar si los filtros tienen idestudiante => alternativa 
            var idestudiante = "";
            var idmateria = "";
            var idciclolectivo=0;
            if (arrayfiltros.Length > 1)
            {
                /* for (int i =0; i < arrayfiltros.Length;i++){ */
                idestudiante = arrayfiltros[0];
                idmateria = arrayfiltros[1];
                try
                {
                    idciclolectivo = Convert.ToInt32(arrayfiltros[2]);
                }
                catch (System.Exception)
                {
                     idciclolectivo = 0;
                }
                
                /* } */
            }

            return CalificacionestudianteConexion<notarepo>.Instance.SerchNotaestudiantes(Convert.ToInt32(idestudiante), Convert.ToInt32(idmateria), idciclolectivo);

        }
        else return null;

    }





    [HttpGet("{id}")]
    public calificacionestudiante GetNotarepo(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CalificacionestudianteConexion<calificacionestudiante>.Instance.SearchId(id);
        }
        else return null;
    }
}