using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class UsuarioController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<usuario> Index([FromBody] usuario usuario, [FromHeader] string token)
    {
        if(token == null && usuario != null){
           var auxusu = UsuarioConexion<usuario>.Instance.SearchAll(null,$" and nombre = '{usuario.Nombre}'");
            if(auxusu.Count==1){
                return Json("UsuarioExistente");
            }
            usuario.Codigoayuda="usuario-cv";
            var id = UsuarioConexion<usuario>.Instance.Insert(usuario);
            RolesusuarioConexion<rolesusuario>.Instance.addRolCv(id);
            EnviarCorreoElectronico.GestorCorreo gestor = new EnviarCorreoElectronico.GestorCorreo();
            try
            {
                gestor.EnviarCorreo(usuario.Correo,
                                "Acceso concedido",
                                $"Bienvenido !!!, usted posee acceso al portal de curriculums y convocatorias de autogestión de ISAUI. Ingrese <a href='.'>aquí<a> para acceder. <br> <p>Usuario: '{usuario.Nombre}' </p> <p> Contraseña: '{usuario.Codigo}' </p>","Acceso concedido", true);
            }
            catch (System.Exception)
            {
                
                return Json("UsuarioCv");
            }
            

            return Json("UsuarioCv");
        }

        else if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        UsuarioConexion<usuario>.Instance.Insert(usuario);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<usuario> Put([FromBody] usuario usuario, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        UsuarioConexion<usuario>.Instance.Update(usuario);
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
        var r = UsuarioConexion<usuario>.Instance.Delete(Convert.ToInt32(id));
        if(r){return Json("registro eliminado");}
        else return Json("error");
        }
        else return Json("error");
    }

    //GET
    [HttpGet]
    public IEnumerable<usuario> Getusuarios([FromHeader]string[] arrayfiltros, [FromHeader] string token, [FromHeader] string limit = null, [FromHeader] string offset = null)
    {
    if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return UsuarioConexion<usuario>.Instance.SearchAll(arrayfiltros,null,limit,offset);
            }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}" )]
    public usuario Getusuario(int id, string nom=null, string cod=null, [FromHeader] string token=null)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return UsuarioConexion<usuario>.Instance.SearchId(id);
            }
        else return null;
        
    }
    [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return UsuarioConexion<usuario>.Instance.cantidadRegistros;
        }
        else return 0;
    }

     [HttpPost("foto"), DisableRequestSizeLimit]
    public ActionResult SetFotoPerfil([FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            var file = Request.Form.Files[0];
            using (var ms = new System.IO.MemoryStream())
                {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                string s = "data:image/png;base64,"+Convert.ToBase64String(fileBytes);
                // act on the Base64 data
                UsuarioConexion<usuario>.Instance.setFoto(UsuarioConexion<usuario>.Instance.getIdUserToken(token), s);
                }
            
            return Json("archivo almacenado"); 
        }
        else return Json("error durante el almacenamiento"); 
    }
      [HttpGet("estilo")]
    public ActionResult SetEstiloPerfil([FromHeader] string token, [FromHeader] string estilo)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            UsuarioConexion<usuario>.Instance.setEstilo(UsuarioConexion<usuario>.Instance.getIdUserToken(token), estilo);
            return Json("estilo almacenado"); 
        }
        else return Json("error durante el almacenamiento"); 
    }
}

