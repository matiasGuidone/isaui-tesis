using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class DatoadjuntoController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<datoadjunto> Index([FromBody] datoadjunto[] datoadjunto, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            var user = UsuarioConexion<usuario>.Instance.getIdUserToken(token);
            string[] filtrouser = { "idusuario", user.ToString() };
            var curr = CurriculumConexion<curriculum>.Instance.SearchAll(filtrouser);
            string[] filtro = { "idcurriculum", curr[0].Id.ToString() };

            var datoadj = DatoadjuntoConexion<datoadjunto>.Instance.SearchAll(filtro);
            List<datoadjunto> listaux = new List<datoadjunto>();
            foreach (var m in datoadjunto)
            {
                listaux.Add(m);
            }

            if(datoadj.Count>0){
            foreach (var m in datoadj)
            {
                var aux = listaux.Find(p => p.Direccion == m.Direccion);
                if (aux == null){ 
                     DatoadjuntoConexion<datoadjunto>.Instance.DeleteFile(m.Id); 
                }
                else{
                    var ind = listaux.FindIndex (p => p.Direccion == m.Direccion);
                    listaux.RemoveAt(ind); 
                }
                
            }
            }
            foreach (var item in listaux )
            { 
                if(item.Id==0){
                    DatoadjuntoConexion<datoadjunto>.Instance.Insert(item); 
                }
                else{
                   // DatoadjuntoConexion<datoadjunto>.Instance.Update(item); 
                }
            }
            //(datoadjunto);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;

    }

    // PUT
    [HttpPut]
    public ActionResult<datoadjunto> Put([FromBody] datoadjunto datoadjunto, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {

            DatoadjuntoConexion<datoadjunto>.Instance.Update(datoadjunto);
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
            DatoadjuntoConexion<datoadjunto>.Instance.Delete(Convert.ToInt32(id));
            return Json("registro eliminado");
        }
        else return null;

    }

    //GET
    [HttpGet]
    public IEnumerable<datoadjunto> Getdatoadjuntos([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DatoadjuntoConexion<datoadjunto>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public datoadjunto Getdatoadjunto(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return DatoadjuntoConexion<datoadjunto>.Instance.SearchId(id);
        }
        else return null;
    }
}

