using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

[Route("api/[controller]")]

public class MateriaalumnomensajeController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<materiaalumnomensaje> Index([FromBody] materiaalumnomensaje Materiaalumnomensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Insert(Materiaalumnomensaje);
            return Json("Guardado exitoso");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<materiaalumnomensaje> Put([FromBody] materiaalumnomensaje Materiaalumnomensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Update(Materiaalumnomensaje);
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
            MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]


    public JsonResult mensajes([FromHeader]string arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
          Conexion con = new Conexion();
          DataTable Tabla = new DataTable();
          var mensajes = con.consultaDataTable($"SELECT mensaje.mensaje, materia.nombre, mensaje.titulo FROM(((alumno INNER JOIN alumnomateria ON alumno.Id = alumnomateria.Idalumno) INNER JOIN mensaje on mensaje.Idmateria =alumnomateria.Idmateria)INNER JOIN materia on materia.Id =alumnomateria.Idmateria) WHERE alumno.id ={arrayfiltros} AND NOW() <= mensaje.fechafin and NOW() >= mensaje.fechainicio");
          Tabla = mensajes.Tables[0];
          List<materiaalumnomensaje> mensajes_e = new List<materiaalumnomensaje>();
          
          if (Tabla.Rows.Count >= 1){
            foreach(DataRow row in Tabla.Rows){
    
               mensajes_e.Add(new materiaalumnomensaje { 
               Idalumno= arrayfiltros, 
               tituloMensaje=row["titulo"].ToString(),
               NombreMateria=row["nombre"].ToString(),
               mensaje=row["mensaje"].ToString()

                });
          

            }
            
          } 
          return Json(mensajes_e);
        }
        else { return Json("no tienes los permisos suficientes"); }
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public materiaalumnomensaje Getmateriaalumnomensaje(int id, [FromHeader] string token)
    {
     /*    if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        { */
            return MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.SearchId(id);
     /*    }
        else return null; */
    }
}

