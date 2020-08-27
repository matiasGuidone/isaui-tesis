 
    public class MensajeConexion<T> : ObjetoConexion<mensaje>
    {
       
        private static MensajeConexion<T> instance;
         public static MensajeConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MensajeConexion<T>(new mensaje());
                return instance;
            }
        } 
        private MensajeConexion(mensaje aux): base(aux){}
        
    }