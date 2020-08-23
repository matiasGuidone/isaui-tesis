 
    public class CurriculumConexion<T> : ObjetoConexion<curriculum>
    {
       
        private static CurriculumConexion<T> instance;
         public static CurriculumConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CurriculumConexion<T>(new curriculum());
                return instance;
            }
        } 
        private CurriculumConexion(curriculum aux): base(aux){ 
            
        }
        
    }