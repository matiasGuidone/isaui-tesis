 
    public class MateriaConexion<T> : ObjetoConexion<materia>
    {
       
        private static MateriaConexion<T> instance;
         public static MateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MateriaConexion<T>(new materia());
                return instance;
            }
        } 
        private MateriaConexion(materia aux): base(aux){ 
            
        }
        
    }