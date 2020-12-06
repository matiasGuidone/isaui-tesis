 
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Net.Http.Headers;

 
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost, DisableRequestSizeLimit]
        public ActionResult UploadFile([FromHeader]string log, [FromHeader] string token )
        {
            if (UsuarioConexion<usuario>.Instance.getUserToken(token))
        {
                string fullPath = "";
                try
                {
                    var file = Request.Form.Files[0];
                   
                    if (file.Name.Contains("P_"))
                    {
                        string folderName = "Pdf_Cv"+UsuarioConexion<usuario>.Instance.getIdUserToken(token).ToString();
                       // string webRootPath = _hostingEnvironment.WebRootPath;
                        //string newPath = Path.Combine(webRootPath, folderName);
                        if (!Directory.Exists(folderName))
                        {
                            Directory.CreateDirectory(folderName);
                        }
                        if (file.Length > 0)
                        {
                            //string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                           
                             fullPath = Path.Combine(folderName, file.Name); 
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                file.CopyTo(stream);
                            }
                            // ControlTablasCurriculum.Instance.DireccionPdf(fullPath);
                        }

                    }

                    return Json("{\"path\":\""+fullPath.Replace ("\\","/")+"\"}");
                }
                catch (System.Exception ex)
                {
                    _ = ex;
                    return Json("No se pudo subir el archivo ");
                }
            }
            return null;
        }
        [HttpGet]
        public byte[] GetPdf([FromHeader]string fileDir,[FromHeader]string token)
        {
            if (UsuarioConexion<usuario>.Instance.getUserToken(token))
            {
                try { return System.IO.File.ReadAllBytes(fileDir); } catch (Exception e) { return null; }
            }
            return null;
            
        }
        
    }
 