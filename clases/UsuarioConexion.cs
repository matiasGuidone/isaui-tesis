 
    public class UsuarioConexion<T> : ObjetoConexion<usuario>
    {
       
        private static UsuarioConexion<T> instance;
         public static UsuarioConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new UsuarioConexion<T>(new usuario());
                return instance;
            }
        } 
        private UsuarioConexion(usuario aux): base(aux){ 
            
        }
        
    }