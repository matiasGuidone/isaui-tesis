 
    public class AntecedentetituloConexion<T> : ObjetoConexion<antecedentetitulo>
    {
       
        private static AntecedentetituloConexion<T> instance;
         public static AntecedentetituloConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AntecedentetituloConexion<T>(new antecedentetitulo());
                return instance;
            }
        } 
        private AntecedentetituloConexion(antecedentetitulo aux): base(aux){ 
            
        }
        
    }
 