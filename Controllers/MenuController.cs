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
    public ActionResult<menu> Index([FromBody] menu Menu)
    {
        MenuConexion<menu>.Instance.Insert(Menu);
        return Json("Guardado exitoso");
    }

    // PUT
    [HttpPut]
    public ActionResult<menu> Put([FromBody] menu Menu)
    {
        MenuConexion<menu>.Instance.Update(Menu);
        return Json("Guardado exitoso");
    }

    // DELETE
    [HttpDelete]
    public ActionResult Delete([FromHeader] string id)
    {
        MenuConexion<menu>.Instance.Delete(Convert.ToInt32(id));
        return Json("registro eliminado");
    }

    //GET
    [HttpGet]
    public IEnumerable<menu> GetMenus()
    {
        return MenuConexion<menu>.Instance.SearchAll();
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public menu GetMenu(int id)
    {
        return MenuConexion<menu>.Instance.SearchId(id);
    }
}

