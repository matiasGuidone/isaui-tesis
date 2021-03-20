using System.Net.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

[Route("api/[controller]")]

public class MateriaestudiantemensajeController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<materiaestudiantemensaje> Index([FromBody] materiaestudiantemensaje Materiaestudiantemensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaestudiantemensajeConexion<materiaestudiantemensaje>.Instance.Insert(Materiaestudiantemensaje);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<materiaestudiantemensaje> Put([FromBody] materiaestudiantemensaje Materiaestudiantemensaje, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaestudiantemensajeConexion<materiaestudiantemensaje>.Instance.Update(Materiaestudiantemensaje);
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
            MateriaestudiantemensajeConexion<materiaestudiantemensaje>.Instance.Delete(Convert.ToInt32(id));
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
          var mensajes = con.consultaDataTable($"SELECT mensaje.mensaje, materia.nombre, mensaje.titulo FROM(((estudiante INNER JOIN estudiantemateria ON estudiante.Id = estudiantemateria.Idestudiante) INNER JOIN mensaje on mensaje.Idmateria =estudiantemateria.Idmateria)INNER JOIN materia on materia.Id =estudiantemateria.Idmateria) WHERE estudiante.id ={arrayfiltros} AND NOW() <= mensaje.fechafin and NOW() >= mensaje.fechainicio");
          Tabla = mensajes.Tables[0];
          List<materiaestudiantemensaje> mensajes_e = new List<materiaestudiantemensaje>();
          
          if (Tabla.Rows.Count >= 1){
            foreach(DataRow row in Tabla.Rows){
    
               mensajes_e.Add(new materiaestudiantemensaje { 
               Idestudiante= arrayfiltros, 
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
    public materiaestudiantemensaje Getmateriaestudiantemensaje(int id, [FromHeader] string token)
    {
     /*    if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        { */
            return MateriaestudiantemensajeConexion<materiaestudiantemensaje>.Instance.SearchId(id);
     /*    }
        else return null; */
    }
}

