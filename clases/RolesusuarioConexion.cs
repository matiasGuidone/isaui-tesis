
    public class RolesusuarioConexion<T> : ObjetoConexion<rolesusuario>
    {
       
        private static RolesusuarioConexion<T> instance;
         public static RolesusuarioConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new RolesusuarioConexion<T>(new rolesusuario());
                return instance;
            }
        } 
        private RolesusuarioConexion(rolesusuario aux): base(aux){ 
            
        }
        
    }