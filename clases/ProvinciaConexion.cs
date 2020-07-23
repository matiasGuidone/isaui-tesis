 
    public class ProvinciaConexion<T> : ObjetoConexion<provincia>
    {
       
        private static ProvinciaConexion<T> instance;
         public static ProvinciaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new ProvinciaConexion<T>(new provincia());
                return instance;
            }
        } 
        private ProvinciaConexion(provincia aux): base(aux){ 
            
        }
        
    }
 