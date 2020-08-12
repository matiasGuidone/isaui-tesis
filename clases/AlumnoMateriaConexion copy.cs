 
    public class DocenteMateriaConexion<T> : ObjetoConexion<docentemateria>
    {
       
        private static DocenteMateriaConexion<T> instance;
         public static DocenteMateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DocenteMateriaConexion<T>(new docentemateria());
                return instance;
            }
        } 
        private DocenteMateriaConexion(docentemateria aux): base(aux){ 
            
        }
        
    }
 