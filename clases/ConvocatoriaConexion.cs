 
    public class ConvocatoriaConexion<T> : ObjetoConexion<convocatoria>
    {
       
        private static ConvocatoriaConexion<T> instance;
         public static ConvocatoriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new ConvocatoriaConexion<T>(new convocatoria());
                return instance;
            }
        } 
        private ConvocatoriaConexion(convocatoria aux): base(aux){ 
            
        }
        
    }
 