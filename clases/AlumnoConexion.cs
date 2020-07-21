 
    public class AlumnoConexion<T> : ObjetoConexion<alumno>
    {
       
        private static AlumnoConexion<T> instance;
         public static AlumnoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AlumnoConexion<T>(new alumno());
                return instance;
            }
        } 
        private AlumnoConexion(alumno aux): base(aux){ 
            
        }
        
    }
 