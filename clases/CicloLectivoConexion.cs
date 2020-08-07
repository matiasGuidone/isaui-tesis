 public class CicloLectivoConexion<T> : ObjetoConexion<ciclolectivo>
    {
       
        private static CicloLectivoConexion<T> instance;
         public static CicloLectivoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CicloLectivoConexion<T>(new ciclolectivo());
                return instance;
            }
        } 
        private CicloLectivoConexion(ciclolectivo aux): base(aux){ 
            
        }
        
    }