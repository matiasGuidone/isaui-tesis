 
    public class LocalidadConexion<T> : ObjetoConexion<localidad>
    {
       
        private static LocalidadConexion<T> instance;
         public static LocalidadConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new LocalidadConexion<T>(new localidad());
                return instance;
            }
        } 
        private LocalidadConexion(localidad aux): base(aux){ 
            
        }
        
    }
 