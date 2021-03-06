﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization; //importa el  authorize
/* using Microsoft.AspNetCore.Authentication.JwtBearer; */ // jwtbearrerdefaults

namespace isaui_tesis.Controllers
{
    [ApiController]
    [Produces("application/json")]  //agregado
    [Route("[controller]")]
    /* [Authorize (AuthenticationSchemes= JwtBearerDefaults.AuthenticationSchemes)] */ //inpide el acceso a aquelos usuario q no estan autorizado (no podran entrar a este controlador)
    // entre parentesis se pone la autorizacion de json web token
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            ObjetoConexion<docente> cone = new ObjetoConexion<docente>(new docente());
            List<docente> docentes = cone.SearchAll();

            cone.Insert(docentes[0]);
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
