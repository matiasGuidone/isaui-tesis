 
 using System;
using System.IO;
    public class DatoadjuntoConexion<T> : ObjetoConexion<datoadjunto>
    {
       
        private static DatoadjuntoConexion<T> instance;
         public static DatoadjuntoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DatoadjuntoConexion<T>(new datoadjunto());
                return instance;
            }
        } 
        private DatoadjuntoConexion(datoadjunto aux): base(aux){ 
            
        }
        public void DeleteFile(int id){
            var path = this.SearchId(id).Direccion;
            File.Delete(path);
            this.Delete(id);
        }
        
    }
 