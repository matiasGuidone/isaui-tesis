using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class MenuController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<menu> Index([FromBody] menu Menu, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        MenuConexion<menu>.Instance.Insert(Menu);
        return Json("Guardado exitoso");
         }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<menu> Put([FromBody] menu Menu, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        MenuConexion<menu>.Instance.Update(Menu);
        return Json("Guardado exitoso");
         }
        else return null;
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        MenuConexion<menu>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
         }
        else return null;
    }

    //GET
    [HttpGet]
    public IEnumerable<menu> GetMenus([FromHeader]string[] arrayfiltros, [FromHeader] string token)
    {   if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return MenuConexion<menu>.Instance.SearchAll(arrayfiltros);
         }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public menu GetMenu(int id, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
        return MenuConexion<menu>.Instance.SearchId(id);
         }
        else return null;
    }
}

