 
    public class HorasDiaConexion : ObjetoConexion<horasdia>
    {
       
        private static HorasDiaConexion instance;
         public static HorasDiaConexion Instance
        {
            get
            {
                if (instance == null)
                    instance = new HorasDiaConexion(new horasdia());
                return instance;
            }
        } 
        private HorasDiaConexion(horasdia aux): base(aux){ 
            
        }
        
    }
 