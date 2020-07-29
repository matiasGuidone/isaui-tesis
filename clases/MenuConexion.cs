 
    public class MenuConexion<T> : ObjetoConexion<menu>
    {
       
        private static MenuConexion<T> instance;
         public static MenuConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MenuConexion<T>(new menu());
                return instance;
            }
        } 
        private MenuConexion(menu aux): base(aux){ 
            
        }
        
    }
 