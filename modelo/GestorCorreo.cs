using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace EnviarCorreoElectronico
{
    public class GestorCorreo
    {
        private SmtpClient cliente;
        private static IConfiguration Configuration { get; set; }
        private MailMessage email;
        public GestorCorreo()
        {
            InicializaConfiguracion();
            cliente = new SmtpClient(Configuration["host"], Int32.Parse(Configuration["port"]))
            {
                EnableSsl = Boolean.Parse(Configuration["enableSsl"]),
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Configuration["user"], Configuration["password"])
            };
        }
        private static void InicializaConfiguracion()
        {
            var builder = new ConfigurationBuilder()
                                    .SetBasePath(Directory.GetCurrentDirectory())
                                    .AddXmlFile("configuracion.xml");
            Configuration = builder.Build();
        }
        public void EnviarCorreo(string destinatario, string asunto, string mensaje, string titulo, bool esHtlm = false)
        {
            if(esHtlm){
                var msj = Configuration["msjhtml"];
                msj = msj.ToString().Replace("#mensaje",mensaje);
                msj = msj.ToString().Replace("#titulo",titulo);
                mensaje = msj;
            }
            email = new MailMessage(Configuration["user"], destinatario, asunto, mensaje);
            email.IsBodyHtml = esHtlm;
            cliente.Send(email);
        }
        public void EnviarCorreo(MailMessage message)
        {
            cliente.Send(message);
        }
        public async Task EnviarCorreoAsync(MailMessage message)
        {
            await cliente.SendMailAsync(message);
        }
    }
}
