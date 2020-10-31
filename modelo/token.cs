using System.Data;
using System;
 
    public class token
    {
        public string tok { get; set; }
        public DateTime fechahora { get; set; }

        public Int32 idusuario{get;set;}
        public token(string tok, DateTime dat,int idusuario)
        {
            this.tok= tok;
            this.fechahora = dat;
            this.idusuario = idusuario;
            
        }
    }
 