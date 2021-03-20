using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class AltadocenteController : Controller
{
    
    // POST
    [HttpPost]
    public ActionResult<string> Index([FromHeader] string idcv,[FromHeader] string idmateria, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            //comprobar si el usuario es un docente
            var idusuario = CurriculumConexion<curriculum>.Instance.SearchId(Convert.ToInt32(idcv)).Idusuario;
            string[] filtro = {"idusuario",idusuario.ToString()};
            var roles = RolesusuarioConexion<rolesusuario>.Instance.SearchAll(filtro);
            bool esdocente = false;
            var todosroles = RolesConexion<roles>.Instance.SearchAll();
            var roldocente = 0;
            var iddoc =0;

            foreach (var item in todosroles){ if(item.Nombre == "docente"){roldocente = item.Id;} }
            foreach (var item in roles)
            {   if(item.Idroles == roldocente){
                    esdocente= true;
                }
            }
            
            //se genera un docente nuevo con los datos del curriculum en el caso de no existir
                var docen = DocenteConexion<docente>.Instance.SearchAll(filtro);
                
                if (docen.Count==1){
                    iddoc = docen[0].Id;
                }
                else{
                    var datospersonalescv = CurriculumConexion<curriculum>.Instance.SearchId(Convert.ToInt32(idcv));
                    
                    var nuevodocente = new docente();
                        nuevodocente.Apellido = datospersonalescv.Apellido;
                        nuevodocente.Correo = datospersonalescv.Correo;
                        nuevodocente.Dni = datospersonalescv.Numerodoc;
                        nuevodocente.Iddomicilio = datospersonalescv.Iddomicilio;
                        nuevodocente.Idusuario = datospersonalescv.Idusuario;
                        nuevodocente.Nombre = datospersonalescv.Nombre;
                        nuevodocente.Telefono = datospersonalescv.Telefono;
                    iddoc = DocenteConexion<docente>.Instance.Insert(nuevodocente);
                  }
            //si no tiene el rol de docente se asigna el rol
            if(!esdocente){   
                var roluser = new rolesusuario();
                roluser.Descripcion = "Docente asignado desde autogestión";
                roluser.Idroles = roldocente;
                roluser.Idusuario = idusuario;
                RolesusuarioConexion<rolesusuario>.Instance.Insert(roluser);
            }
             
            //finalmente se enlaza el docente con la materia
            var cicloactual = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            docentemateria docentmateria;
            string[] filt = {"idciclolectivo",cicloactual.ToString(),"idmateria",idmateria};
            var docentm = DocenteMateriaConexion<docentemateria>.Instance.SearchAll(filt);
            if(docentm.Count>0){
                docentmateria = docentm[0];
                docentmateria.Iddocente = iddoc;
                 DocenteMateriaConexion<docentemateria>.Instance.Update(docentmateria);
            }
            else{
                docentmateria = new docentemateria();
                docentmateria.Idciclolectivo = 
                docentmateria.Iddocente = iddoc;
                docentmateria.Idmateria = Convert.ToInt32(idmateria);
                DocenteMateriaConexion<docentemateria>.Instance.Insert(docentmateria);
            }
            

        //CalificacionestudianteConexion<calificacionestudiante>.Instance.Insert(Calificacionestudiante);
        return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

  
 
}

