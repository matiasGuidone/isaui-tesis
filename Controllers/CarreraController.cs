using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class CarreraController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<carrera> Index([FromBody] carrera carrera, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CarreraConexion<carrera>.Instance.Insert(carrera);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;


    }

    // PUT
    [HttpPut]
    public ActionResult<carrera> Put([FromBody] carrera carrera, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        CarreraConexion<carrera>.Instance.Update(carrera);
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
        CarreraConexion<carrera>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
       }
        else return null;


    }

    //GET
    [HttpGet]
    public IEnumerable<carrera> Getcarreras([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    { 
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return CarreraConexion<carrera>.Instance.SearchAll(arrayfiltros);
        }
        else return null;

    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public carrera Getcarrera(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return CarreraConexion<carrera>.Instance.SearchId(id);
        }
        else return null;

    }

     [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return CarreraConexion<carrera>.Instance.cantidadRegistros;
        }
        else return 0;
    }
}

