 
 using System;
using System.Collections.Generic;
    public class ConvocatoriaConexion<T> : ObjetoConexion<convocatoria>
    {
       
        private static ConvocatoriaConexion<T> instance;
         public static ConvocatoriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new ConvocatoriaConexion<T>(new convocatoria());
                return instance;
            }
        } 
        private ConvocatoriaConexion(convocatoria aux): base(aux){ 
            
        }
        public List<convocatoria> SearchActivas(){
            return this.SearchAll(null,"  and convocatoria.fechafin >= sysdate() and convocatoria.fechainicio <= sysdate() ");

            //return default(List<convocatoria>);
        }
        
    }
 