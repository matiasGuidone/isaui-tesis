public class InvestigacioninformacionConexion<T> : ObjetoConexion<investigacion>
    {
       
        private static InvestigacioninformacionConexion<T> instance;
         public static InvestigacioninformacionConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new InvestigacioninformacionConexion<T>(new investigacion());
                return instance;
            }
        } 
        private InvestigacioninformacionConexion(investigacion aux): base(aux){ 
            
        }
        
    }
 