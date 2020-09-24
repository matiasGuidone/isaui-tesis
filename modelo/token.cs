using System.Data;
using System;
 
    public class token
    {
        public string tok { get; set; }
        public DateTime fechahora { get; set; }
        public token(string tok, DateTime dat)
        {
            this.tok= tok;
            this.fechahora = dat;
            
        }
    }
 