public class InvestigacioninformacionConexion<T> : ObjetoConexion<investigacioninformacion>
    {
       
        private static InvestigacioninformacionConexion<T> instance;
         public static InvestigacioninformacionConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new InvestigacioninformacionConexion<T>(new investigacioninformacion());
                return instance;
            }
        } 
        private InvestigacioninformacionConexion(investigacioninformacion aux): base(aux){ 
            
        }
        
    }
 