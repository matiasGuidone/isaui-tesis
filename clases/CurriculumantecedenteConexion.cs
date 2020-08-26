 
    public class CurriculumantecedenteConexion<T> : ObjetoConexion<curriculumantecedente>
    {
       
        private static CurriculumantecedenteConexion<T> instance;
         public static CurriculumantecedenteConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CurriculumantecedenteConexion<T>(new curriculumantecedente());
                return instance;
            }
        } 
        private CurriculumantecedenteConexion(curriculumantecedente aux): base(aux){ 
            
        }
        
    }