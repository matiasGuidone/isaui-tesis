using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[Route("api/[controller]")]

public class CurriculumRepoController : Controller
{
    [HttpGet]

public IEnumerable<ordenmerito> Getcv([FromHeader] string arrayfiltros, [FromHeader] string token)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token)) // se fija si trae token
        {
            var idconvocatoria = "";
            if (arrayfiltros.Length > 0)
            {
                /* for (int i =0; i < arrayfiltros.Length;i++){ */
                idconvocatoria = arrayfiltros;
                /* } */
            }

            return CurriculumconvocatoriaConexion<ordenmerito>.Instance.serchCv(Convert.ToInt32(idconvocatoria));

        }
        else return null;

    }
}