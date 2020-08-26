using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class MateriaalumnomensajeController: Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<materiaalumnomensaje> Index([FromBody] materiaalumnomensaje Materiaalumnomensaje)
    {
        MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Insert(Materiaalumnomensaje);
        return Json("Guardado exitoso");

    }

    // PUT
    [HttpPut]
    public ActionResult<materiaalumnomensaje> Put([FromBody] materiaalumnomensaje Materiaalumnomensaje)
    {

        MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Update(Materiaalumnomensaje);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        
        MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");

    }

    //GET
    [HttpGet]
    public IEnumerable<materiaalumnomensaje> Getmateriaalumnomensajes([FromHeader]string[] arrayfiltros)
    {
        
        return MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public materiaalumnomensaje Getmateriaalumnomensaje(int id)
    {
      
        return MateriaalumnomensajeConexion<materiaalumnomensaje>.Instance.SearchId(id);
    }
}

