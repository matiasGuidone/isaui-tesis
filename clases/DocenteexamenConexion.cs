 
    public class DocenteexamenConexion<T> : ObjetoConexion<docenteexamen>
    {
       
        private static DocenteexamenConexion<T> instance;
         public static DocenteexamenConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DocenteexamenConexion<T>(new docenteexamen());
                return instance;
            }
        } 
        private DocenteexamenConexion(docenteexamen aux): base(aux){ 
            
        }
        
    }