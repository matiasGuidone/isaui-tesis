 
    public class LugarConexion<T> : ObjetoConexion<lugar>
    {
       
        private static LugarConexion<T> instance;
         public static LugarConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new LugarConexion<T>(new lugar());
                return instance;
            }
        } 
        private LugarConexion(lugar aux): base(aux){ 
            
        }
        
    }
 