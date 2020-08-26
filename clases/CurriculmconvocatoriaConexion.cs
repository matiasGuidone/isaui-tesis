 
    public class CurriculumconvocatoriaConexion<T> : ObjetoConexion<curriculumconvocatoria>
    {
       
        private static CurriculumconvocatoriaConexion<T> instance;
         public static CurriculumconvocatoriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CurriculumconvocatoriaConexion<T>(new curriculumconvocatoria());
                return instance;
            }
        } 
        private CurriculumconvocatoriaConexion(curriculumconvocatoria aux): base(aux){ 
            
        }
        
    }