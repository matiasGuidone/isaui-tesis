 
    public class AsistenciaConexion<T> : ObjetoConexion<asistencia>
    {
       
        private static AsistenciaConexion<T> instance;
         public static AsistenciaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AsistenciaConexion<T>(new asistencia());
                return instance;
            }
        } 
        private AsistenciaConexion(asistencia aux): base(aux){ 
            
        }
        
    }