public class ExamenConexion<T> : ObjetoConexion<examen>
    {
       
        private static ExamenConexion<T> instance;
         public static ExamenConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new ExamenConexion<T>(new examen());
                return instance;
            }
        } 
        private ExamenConexion(examen aux): base(aux){ 
            
        }
        
    }
 