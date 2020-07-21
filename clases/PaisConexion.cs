 
    public class PaisConexion<T> : ObjetoConexion<pais>
    {
       
        private static PaisConexion<T> instance;
         public static PaisConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new PaisConexion<T>(new pais());
                return instance;
            }
        } 
        private PaisConexion(pais aux): base(aux){ 
            
        }
        
    }
 