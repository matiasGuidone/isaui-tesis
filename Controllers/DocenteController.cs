using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


    [Route("api/[controller]")]

    public class DocenteController : Controller
    {
        //private List<Avisos> Avisos { get; set; }


        // POST: api/
        // [HttpPost]
        // public ActionResult<docente> Index([FromBody] Avisos param,[FromHeader]string log)
        // {
        //     if (log == "admin")
        //     {
        //         ControlTablasAvisos.Instance.Insert(param);
        //         return Json("Guardado exitoso");
        //     }
        //     return null;
        // }

        // PUT: api/ControladorAvisos/5
        // [HttpPut]
        // public ActionResult<Avisos> Put( [FromHeader] string log,[FromHeader] string elimina=null,[FromBody] Avisos param=null)
        // {
        //     if (log == "admin")
        //     {
        //         ControlTablasAvisos.Instance.Update(param, elimina);
        //         return Json("Guardado exitoso");
        //     }
        //     return null;
        // }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public void Delete([FromHeader]string id)
        {
             
                // ControlTablasAvisos.Instance.Delete(id);
             
        }
   
       

        [HttpGet]
        public IEnumerable<docente> GetDocentes() 
        {
            ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
            return cone.SearchAll();
        }

        
    }
 
