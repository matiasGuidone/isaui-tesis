 
    public class CursoestudianteConexion<T> : ObjetoConexion<cursoestudiante>
    {
       
        private static CursoestudianteConexion<T> instance;
         public static CursoestudianteConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CursoestudianteConexion<T>(new cursoestudiante());
                return instance;
            }
        } 
        private CursoestudianteConexion(cursoestudiante aux): base(aux){ 
            
        }
        
    }
 