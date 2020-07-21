 
    public class DomicilioConexion<T> : ObjetoConexion<domicilio>
    {
       
        private static DomicilioConexion<T> instance;
         public static DomicilioConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DomicilioConexion<T>(new domicilio());
                return instance;
            }
        } 
        private DomicilioConexion(domicilio aux): base(aux){ 
            
        }
        
    }
 