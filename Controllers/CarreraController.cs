using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


    [Route("api/[controller]")] 

    public class CarreraController : Controller
    {

        // POST: api/
        [HttpPost]
        public ActionResult<carrera> Index([FromBody] carrera carrera )
        {
             ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
             cone.Insert(carrera);
             return Json("Guardado exitoso");
             
        }

        // PUT: api/ControladorAvisos/5
        [HttpPut]
        public ActionResult<carrera> Put([FromBody] carrera carrera)
        {
             
                ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
                cone.Update(carrera);
                return Json("Guardado exitoso");
             
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        public ActionResult Delete([FromHeader]string id)
        {
             ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
             cone.Delete(Convert.ToInt32(id));
             return Json("registro eliminado");
                // ControlTablasAvisos.Instance.Delete(id);
             
        }
        [HttpGet]
        public IEnumerable<carrera> Getcarreras() 
        {
            ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
            return cone.SearchAll();
        }

         [HttpGet("{id}")]
        public carrera getByID([FromHeader]int id)
        {
            ObjetoConexion<carrera> cone = new ObjetoConexion<carrera>(new carrera());
            return cone.SearchId(id);
        }  
    }
