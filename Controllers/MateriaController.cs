using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class MateriaController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<materia> Index([FromBody] materia Materia, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaConexion<materia>.Instance.Insert(Materia);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<materia> Put([FromBody] materia Materia, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            MateriaConexion<materia>.Instance.Update(Materia);
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
            var r = MateriaConexion<materia>.Instance.Delete(Convert.ToInt32(id));
            if (r){ return Json("registro eliminado");}
            else return Json("error");
        }
        else return Json("error");
    }

    //GET
    [HttpGet]
    public IEnumerable<materia> GetMaterias([FromHeader] string[] arrayfiltros, [FromHeader] string token, [FromHeader] string limit = null, [FromHeader] string offset = null)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            if (arrayfiltros.Any(p => p == "idestudiante"))
            {   if (arrayfiltros.Length==2)
                return MateriaConexion<materia>.Instance.SearchByestudiante(Convert.ToInt32(arrayfiltros[1])); 
                if (arrayfiltros.Length==4)
                return MateriaConexion<materia>.Instance.SearchByestudiante(Convert.ToInt32(arrayfiltros[1]),Convert.ToInt32(arrayfiltros[3]));}
            else if (arrayfiltros.Any(p => p == "iddocente"))
            {   if (arrayfiltros.Length==2)
                return MateriaConexion<materia>.Instance.SearchByDocente(Convert.ToInt32(arrayfiltros[1])); 
                if (arrayfiltros.Length==4)
                return MateriaConexion<materia>.Instance.SearchByDocente(Convert.ToInt32(arrayfiltros[1]),Convert.ToInt32(arrayfiltros[3])); }
             else if (arrayfiltros.Any(p => p == "ids"))
            {     
                return MateriaConexion<materia>.Instance.SearchIds(arrayfiltros[1].ToString().Replace("-",",")); 
                }
            
            
            return MateriaConexion<materia>.Instance.SearchAll(arrayfiltros,null,limit,offset);

        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public materia GetMateria(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return MateriaConexion<materia>.Instance.SearchId(id);
        }
        else return null;
    }

     [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    { 
        
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return MateriaConexion<materia>.Instance.cantidadRegistros;
        }
        else return 0;
    }
}

