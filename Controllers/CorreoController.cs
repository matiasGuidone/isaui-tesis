
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;


[Produces("application/json")]
[Route("api/[controller]")]
public class CorreoController : Controller
{
    private IWebHostEnvironment _hostingEnvironment;

    public CorreoController(IWebHostEnvironment hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment;
    }

    [HttpPost, DisableRequestSizeLimit]
    public ActionResult EnvioCorreo([FromHeader] string destino, [FromHeader] string token, [FromHeader] string asunto, [FromHeader] string mensaje, [FromHeader] string plantilla = null)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            EnviarCorreoElectronico.GestorCorreo gestor = new EnviarCorreoElectronico.GestorCorreo();
            if(plantilla != null){

                    gestor.EnviarCorreo(destino,
                                    asunto,
                                    mensaje,asunto, true);
                    return Json("envío efectuado");

            }
            else{  
                gestor.EnviarCorreo(destino,
                                    asunto,
                                    mensaje,asunto);
                                    return Json("envío efectuado");
            }

        }


        return null;
    }


}


                
                // //Correo con archivos adjuntos
                // MailMessage correo = new MailMessage("tucuenta@gmail.com",
                //                                      "benjamin@aspnetcoremaster.com",
                //                                      "Archivo de configuracíon",
                //                                      "Por favor verificar adjunto.");

                // string ruta = "Configuracion.xml";
                // Attachment adjunto = new Attachment(ruta, MediaTypeNames.Application.Xml);
                // correo.Attachments.Add(adjunto);
                // gestor.EnviarCorreo(correo);

                // // Correo con HTML
                // gestor.EnviarCorreo("tucuenta@gmail.com",
                //                     "Prueba",
                //                     "Mensaje en texto plano");
                // // Correo de texto  
                // gestor.EnviarCorreo("tucuenta@gmail.com",
                //                     "Prueba",
                //                     "<h1>Mensaje en HTML<h1><p>Contenido</p>",
                //                     true);
