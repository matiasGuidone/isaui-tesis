using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class CorreoController : Controller
{
   
    [HttpPost]
    public ActionResult EnvioCorreo([FromHeader] string token, [FromBody] datoscorreo data)
    {
        if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
            EnviarCorreoElectronico.GestorCorreo gestor = new EnviarCorreoElectronico.GestorCorreo();
            if(data.plantilla != null){

                    gestor.EnviarCorreo(data.destino,
                                    data.asunto,
                                    data.mensaje,data.asunto, true);
                    return Json("envío efectuado");

            }
            else{  
                gestor.EnviarCorreo(data.destino,
                                    data.asunto,
                                    data.mensaje,data.asunto);
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
