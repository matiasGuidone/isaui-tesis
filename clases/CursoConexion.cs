 
    public class CursoConexion<T> : ObjetoConexion<curso>
    {
       
        private static CursoConexion<T> instance;
         public static CursoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CursoConexion<T>(new curso());
                return instance;
            }
        } 
        private CursoConexion(curso aux): base(aux){ 
            
        }
        
    }
 