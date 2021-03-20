using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class InvestigacioninformacionController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<investigacion> Index([FromBody] investigacion[] Investigacioninformacion, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            var user = UsuarioConexion<usuario>.Instance.getIdUserToken(token);
            string[] filtrouser = { "idusuario", user.ToString() };
            var curr = CurriculumConexion<curriculum>.Instance.SearchAll(filtrouser);
            string[] filtro = { "idcurriculum", curr[0].Id.ToString() };

            var investigaciones = InvestigacioninformacionConexion<investigacion>.Instance.SearchAll(filtro);
            List<investigacion> listaux = new List<investigacion>();
            foreach (var m in Investigacioninformacion)
            {
                listaux.Add(m);
            }

            if (investigaciones.Count > 0)
            {
                foreach (var m in investigaciones)
                {
                    var aux = listaux.Find(p => p.Id == m.Id);
                    if (aux == null)
                    {
                        InvestigacioninformacionConexion<investigacion>.Instance.Delete(m.Id);
                    }
                }
            }
            foreach (var item in Investigacioninformacion)
            {
                if (item.Id == 0)
                {
                    InvestigacioninformacionConexion<investigacion>.Instance.Insert(item);
                }
                else
                {
                    InvestigacioninformacionConexion<investigacion>.Instance.Update(item);
                }
            }

            return Json("El proceso de almacenado se realizó con éxito.");

        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<investigacion> Put([FromBody] investigacion Investigacioninformacion, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            InvestigacioninformacionConexion<investigacion>.Instance.Update(Investigacioninformacion);
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
            InvestigacioninformacionConexion<investigacion>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<investigacion> Getinvestigacioninformacions([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return InvestigacioninformacionConexion<investigacion>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public investigacion Getinvestigacioninformacion(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return InvestigacioninformacionConexion<investigacion>.Instance.SearchId(id);
        }
        else return null;
    }
}

