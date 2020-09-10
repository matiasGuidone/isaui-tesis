 
    public class HorasMateriaConexion<T> : ObjetoConexion<horasmateria>
    {
       
        private static HorasMateriaConexion<T> instance;
         public static HorasMateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new HorasMateriaConexion<T>(new horasmateria());
                return instance;
            }
        } 
        private HorasMateriaConexion(horasmateria aux): base(aux){ 
            
        }
        
    }
 