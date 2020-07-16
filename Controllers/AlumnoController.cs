﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


    [Route("api/[controller]")]

    public class AlumnoController : Controller
    {
        //private List<Avisos> Avisos { get; set; }


        // POST: api/
        [HttpPost]
        public ActionResult<alumno> Index([FromBody] alumno alumno )
        {
             //ObjetoConexion<alumno> cone = new ObjetoConexion<alumno>(new alumno());
             AlumnoConexion<alumno>.Instance.Insert(alumno);
             return Json("Guardado exitoso");
             
        }

        // PUT: api/ControladorAvisos/5
        [HttpPut]
        public ActionResult<alumno> Put([FromBody] alumno alumno)
        {
             
                //ObjetoConexion<alumno> cone = new ObjetoConexion<alumno>(new alumno());
                AlumnoConexion<alumno>.Instance.Update(alumno);
                return Json("Guardado exitoso");
             
        }

      
        [HttpDelete]
        public ActionResult Delete([FromHeader]string id)
        {
             //ObjetoConexion<alumno> cone = new ObjetoConexion<alumno>(new alumno());
             AlumnoConexion<alumno>.Instance.Delete(Convert.ToInt32(id));
             return Json("registro eliminado");
                // ControlTablasAvisos.Instance.Delete(id);
             
        }
        [HttpGet]
        public IEnumerable<alumno> Getalumnos() 
        {
            //ObjetoConexion<alumno> cone = new ObjetoConexion<alumno>(new alumno());
            return AlumnoConexion<alumno>.Instance.SearchAll();
        }

         // GET: api/ApiWithActions/5
        [HttpGet("{id}")]
        public alumno Getalumno(int id) 
        {
            //ObjetoConexion<alumno> cone = new ObjetoConexion<alumno>(new alumno());
            return AlumnoConexion<alumno>.Instance.SearchId(id);
        }
    }
 
