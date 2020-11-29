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
            var idalumno="";
             var idmateria="";
             if(arrayfiltros.Length > 1){
                idalumno=arrayfiltros[0];
                idmateria=arrayfiltros[1];
                }
            //preguntar si los filtros tienen idalumno => alternativa 
             if (UsuarioConexion<usuario>.Instance.getUserToken(token)) // se fija si trae token
            { 
                nombre= CalificacionalumnoConexion<alumno>.Instance.SerchMateriaAlumnos(Convert.ToInt32(idalumno),Convert.ToInt32(idmateria)).ToString(); 
                nota= CalificacionalumnoConexion<alumno>.Instance.SerchNotaAlumnos2(Convert.ToInt32(idalumno),Convert.ToInt32(idmateria)).ToString(); 
                 tipoexamen= CalificacionalumnoConexion<alumno>.Instance.SerchTipoEvaAlumnos(Convert.ToInt32(idalumno),Convert.ToInt32(idmateria)).ToString(); 
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
//preguntar si los filtros tienen idalumno => alternativa 
            var idalumno = "";
            var idmateria = "";
            var idciclolectivo=0;
            if (arrayfiltros.Length > 1)
            {
                /* for (int i =0; i < arrayfiltros.Length;i++){ */
                idalumno = arrayfiltros[0];
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

            return CalificacionalumnoConexion<notarepo>.Instance.SerchNotaAlumnos(Convert.ToInt32(idalumno), Convert.ToInt32(idmateria), idciclolectivo);

        }
        else return null;

    }





    [HttpGet("{id}")]
    public calificacionalumno GetNotarepo(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CalificacionalumnoConexion<calificacionalumno>.Instance.SearchId(id);
        }
        else return null;
    }
}