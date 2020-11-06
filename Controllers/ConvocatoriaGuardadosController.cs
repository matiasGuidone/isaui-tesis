using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

[Route("api/[controller]")]

public class ConvocatoriaGuardadosController : Controller
{

    //GET
    [HttpGet]
    public JsonResult conovocataroriasGuardadas([FromHeader]string arrayfiltros, [FromHeader] string token)
    {
       /*  if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        { */
          Conexion con = new Conexion();
          DataTable Tabla = new DataTable();
          var mensajes = con.consultaDataTable($"SELECT convocatoria.descripcion, convocatoria.fechafin, curriculumconvocatoria.Idcurriculum, curriculumconvocatoria.Idconvocatoria FROM ((convocatoria INNER JOIN curriculumconvocatoria ON convocatoria.Id = curriculumconvocatoria.Idconvocatoria ) INNER JOIN curriculum ON curriculum.Id = curriculumconvocatoria.Idcurriculum) WHERE curriculumconvocatoria.Idconvocatoria <> 0 and curriculum.Id={arrayfiltros}");
          Tabla = mensajes.Tables[0];
          List<currcov> mensajes_e = new List<currcov>();
          
          if (Tabla.Rows.Count >= 1){
            foreach(DataRow row in Tabla.Rows){
    
               mensajes_e.Add(new currcov {  
               Descripcion=row["descripcion"].ToString(),
               Fecha=row["fechafin"].ToString(),
               Idconvocatoria=row["Idconvocatoria"].ToString(),
               Idcurriculum=row["Idcurriculum"].ToString()
                });
          

            }
            
         // } 
          return Json(mensajes_e);
        }
        else { return Json("no tienes los permisos suficientes"); }
    }

}

