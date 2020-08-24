  public class PublicacionConexion<T> : ObjetoConexion<publicacion>
    {
       
        private static PublicacionConexion<T> instance;
         public static PublicacionConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new PublicacionConexion<T>(new publicacion());
                return instance;
            }
        } 
        private PublicacionConexion(publicacion aux): base(aux){ 
            
        }
        
    }
 