  public class RolesConexion<T> : ObjetoConexion<roles>
    {
       
        private static RolesConexion<T> instance;
         public static RolesConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new RolesConexion<T>(new roles());
                return instance;
            }
        } 
        private RolesConexion(roles aux): base(aux){ 
            
        }
        
    }
 