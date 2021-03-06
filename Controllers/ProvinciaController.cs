﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


[Route("api/[controller]")]

public class ProvinciaController : Controller
{

    // POST
    [HttpPost]
    public ActionResult<provincia> Index([FromBody] provincia Provincia, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            ProvinciaConexion<provincia>.Instance.Insert(Provincia);
            return Json("El proceso de almacenado se realizó con éxito.");
        }
        else return null;
    }

    // PUT
    [HttpPut]
    public ActionResult<provincia> Put([FromBody] provincia Provincia, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            ProvinciaConexion<provincia>.Instance.Update(Provincia);
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
            var r = ProvinciaConexion<provincia>.Instance.Delete(Convert.ToInt32(id));
            if(r) {return Json("registro eliminado");}else return Json("error");
        }
        else return Json("error");
    }

    //GET
    [HttpGet]
    public IEnumerable<provincia> GetProvincias([FromHeader] string[] arrayfiltros, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return ProvinciaConexion<provincia>.Instance.SearchAll(arrayfiltros);
        }
        else return null;
    }

    // GET: api/ApiWithActions/5
    [HttpGet("{id}")]
    public provincia GetProvincia(int id, [FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return ProvinciaConexion<provincia>.Instance.SearchId(id);
        }
        else return null;
    }
     [HttpGet("registros")]
    public int Getcantidad([FromHeader] string token)
    {

        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            return ProvinciaConexion<provincia>.Instance.cantidadRegistros;
        }
        else return 0;
    }

}

