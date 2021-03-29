using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<docente> Index([FromBody] docente docente, [FromHeader] string token)
    {
         if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        DocenteConexion<docente>.Instance.Insert(docente);
        DocenteConexion<docente>.Instance.RegistrarRol(docente);
        EnviarCorreoElectronico.GestorCorreo gestor = new EnviarCorreoElectronico.GestorCorreo();
        var usuario = UsuarioConexion<usuario>.Instance.SearchId(docente.Idusuario);

            gestor.EnviarCorreo(docente.Correo,
                                "Acceso concedido",
                                $"Bienvenido !!!, usted posee acceso al portal de Docentes de autogestión de ISAUI. Ingrese <a href='.'>aquí<a> para acceder. <br> <p>Usuario: '{usuario.Nombre}' </p> <p> Contraseña: '{usuario.Codigo}' </p>","Acceso concedido", true);

        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<docente> Put([FromBody] docente docente, [FromHeader] string token)
    {
 
 if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        DocenteConexion<docente>.Instance.Update(docente);
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
        var r = DocenteConexion<docente>.Instance.Delete(Convert.ToInt32(id));
        if(r){return Json("registro eliminado");}
        else return Json("error");
        
        }
        else return Json("error");
     

    }

    //GET
    [HttpGet]
    public IEnumerable<docente> Getdocentes([FromHeader]string[] arrayfiltros, [FromHeader] string token, [FromHeader] string limit = null, [FromHeader] string offset = null)
    {
     if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return DocenteConexion<docente>.Instance.SearchAll(arrayfiltros,null,limit,offset);
        }
        else return null;
    
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docente Getdocente(int id, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return DocenteConexion<docente>.Instance.SearchId(id);
        }
        else return null;
    }

    [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DocenteConexion<docente>.Instance.cantidadRegistros;
        }
        else return 0;
    }

  
}

