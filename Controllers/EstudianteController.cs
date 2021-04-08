using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class estudianteController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<estudiante> Index([FromBody] estudiante estudiante, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            estudianteConexion<estudiante>.Instance.Insert(estudiante);
            estudianteConexion<estudiante>.Instance.RegistrarRol(estudiante);
            EnviarCorreoElectronico.GestorCorreo gestor = new EnviarCorreoElectronico.GestorCorreo();
            var usuario = UsuarioConexion<usuario>.Instance.SearchId(estudiante.Idusuario);
            try
            {
                gestor.EnviarCorreo(estudiante.Correo,
                                       "Acceso concedido",
                                       $"Bienvenido !!!, usted posee acceso al portal de Estudiantes de autogestión de ISAUI. Ingrese <a href='.'>aquí<a> para acceder. <br> <p>Usuario: '{usuario.Nombre}' </p> <p> Contraseña: '{usuario.Codigo}' </p>", "Acceso concedido", true);
            }
            catch (System.Exception)
            {

                return Json("El proceso de almacenado se realizó con éxito.");
            }

            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<estudiante> Put([FromBody] estudiante estudiante, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            estudianteConexion<estudiante>.Instance.Update(estudiante);
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
            var r = estudianteConexion<estudiante>.Instance.Delete(Convert.ToInt32(id));
            if (r) { return Json("registro eliminado"); }
            else return Json("error");
        }
        else return Json("error");

    }

    //GET
    [HttpGet]
    public IEnumerable<estudiante> Getestudiantes([FromHeader] string[] arrayfiltros, [FromHeader] string token, [FromHeader] string limit = null, [FromHeader] string offset = null)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            if (arrayfiltros.Any(p => p == "idcurso"))
            {
                return estudianteConexion<estudiante>.Instance.SearchestudiantesCurso(Convert.ToInt32(arrayfiltros[1]));
            }
            else if (arrayfiltros.Any(p => p == "idmateria"))
            {
                // return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1]));
                if (arrayfiltros.Length == 2)
                    return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1]));
                if (arrayfiltros.Length == 4)
                    return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1]), Convert.ToInt32(arrayfiltros[3]));
                if (arrayfiltros.Length == 6)
                    return estudianteConexion<estudiante>.Instance.SearchestudiantesMateria(Convert.ToInt32(arrayfiltros[1]), Convert.ToInt32(arrayfiltros[3]), Convert.ToInt32(arrayfiltros[5]));
            }
            else
            {
                return estudianteConexion<estudiante>.Instance.SearchAll(arrayfiltros, null, limit, offset);
            }
        }
        return null;// default(List<estudiante>);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public estudiante Getestudiante(int id, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return estudianteConexion<estudiante>.Instance.SearchId(id);
        }
        else return null;
    }
    [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return estudianteConexion<estudiante>.Instance.cantidadRegistros;
        }
        else return 0;
    }
}

