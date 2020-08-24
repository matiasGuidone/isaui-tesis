 
    public class CalificacionalumnoConexion<T> : ObjetoConexion<calificacionalumno>
    {
       
        private static CalificacionalumnoConexion<T> instance;
         public static CalificacionalumnoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CalificacionalumnoConexion<T>(new calificacionalumno());
                return instance;
            }
        } 
        private CalificacionalumnoConexion(calificacionalumno aux): base(aux){ 
            
        }
        
    }