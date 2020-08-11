using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AlumnoMateriaController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<alumnomateria> Index([FromBody] alumnomateria AlumnoMateria)
    {
        // if(AlumnoMateria != null){
        //     string[] fil = {"idalumno", AlumnoMateria.Idalumno.ToString(), "idmateria", AlumnoMateria.Idmateria.ToString(), "idciclolectivo", AlumnoMateria.Idciclolectivo.ToString()};
        //     var aux = AlumnoMateriaConexion<alumnomateria>.Instance.SearchAll(fil);
        //     if(aux.Count == 0 || aux == null){
                
        //     }
        //     else{return Json("El registro ya estaba insertado");}
        // }
        
        // return Json("No se registro ningún cambio");
        AlumnoMateriaConexion<alumnomateria>.Instance.Insert(AlumnoMateria);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<alumnomateria> Put([FromBody] alumnomateria AlumnoMateria)
    {

        //ObjetoConexion<AlumnoMateria> cone = new ObjetoConexion<AlumnoMateria>(new AlumnoMateria());
        AlumnoMateriaConexion<alumnomateria>.Instance.Update(AlumnoMateria);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id,[FromHeader]string filtro,[FromHeader]string valor)
    {
        AlumnoMateriaConexion<alumnomateria>.Instance.Delete(Convert.ToInt32(id), null, filtro, valor);
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<alumnomateria> GetAlumnoMaterias([FromHeader]string[] arrayfiltros)
    {
        return AlumnoMateriaConexion<alumnomateria>.Instance.SearchAll(arrayfiltros);
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public alumnomateria GetAlumnoMateria(int id)
    {
        return AlumnoMateriaConexion<alumnomateria>.Instance.SearchId(id);
    }
}

