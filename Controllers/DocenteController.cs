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
        [HttpPost]
        public ActionResult<docente> Index([FromBody] docente docente )
        {
             ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
             cone.Insert(docente);
             return Json("Guardado exitoso");
             
        }

        // PUT: api/ControladorAvisos/5
        [HttpPut]
        public ActionResult<docente> Put([FromBody] docente docente)
        {
             
                ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
                cone.Update(docente);
                return Json("Guardado exitoso");
             
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public ActionResult Delete([FromHeader]string id)
        {
             ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
             cone.Delete(Convert.ToInt32(id));
             return Json("registro eliminado");
                // ControlTablasAvisos.Instance.Delete(id);
             
        }
        [HttpGet]
        public IEnumerable<docente> GetDocentes() 
        {
            ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
            return cone.SearchAll();
        }

        
    }
 
