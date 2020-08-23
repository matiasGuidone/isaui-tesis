 
    public class CursoAlumnoConexion<T> : ObjetoConexion<cursoalumno>
    {
       
        private static CursoAlumnoConexion<T> instance;
         public static CursoAlumnoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CursoAlumnoConexion<T>(new cursoalumno());
                return instance;
            }
        } 
        private CursoAlumnoConexion(cursoalumno aux): base(aux){ 
            
        }
        
    }
 