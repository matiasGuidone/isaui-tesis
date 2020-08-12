using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DocenteMateriaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<docentemateria> Index([FromBody] docentemateria docenteMateria)
    {
         docenteMateria.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        DocenteMateriaConexion<docentemateria>.Instance.Insert(docenteMateria);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<docentemateria> Put([FromBody] docentemateria docenteMateria)
    {
        docenteMateria.Idciclolectivo = 
            CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
        DocenteMateriaConexion<docentemateria>.Instance.Update(docenteMateria);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id,[FromHeader]string filtro,[FromHeader]string valor)
    {
        DocenteMateriaConexion<docentemateria>.Instance.Delete(Convert.ToInt32(id), null, filtro, valor);
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<docentemateria> GetdocenteMaterias([FromHeader]string[] arrayfiltros)
    {
        return DocenteMateriaConexion<docentemateria>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public docentemateria GetdocenteMateria(int id)
    {
        return DocenteMateriaConexion<docentemateria>.Instance.SearchId(id);
    }
}

