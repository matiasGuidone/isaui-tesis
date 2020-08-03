 public class CicloLectivoConexion<T> : ObjetoConexion<cicloLectivo>
    {
       
        private static CicloLectivoConexion<T> instance;
         public static CicloLectivoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CicloLectivoConexion<T>(new cicloLectivo());
                return instance;
            }
        } 
        private CicloLectivoConexion(cicloLectivo aux): base(aux){ 
            
        }
        
    }