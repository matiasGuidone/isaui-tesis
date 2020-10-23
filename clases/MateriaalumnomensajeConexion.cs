 
    public class MateriaalumnomensajeConexion<T> : ObjetoConexion<materiaalumnomensaje>
    {
       
        private static MateriaalumnomensajeConexion<T> instance;
         public static MateriaalumnomensajeConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MateriaalumnomensajeConexion<T>(new materiaalumnomensaje());
                return instance;
            }
        } 
        private MateriaalumnomensajeConexion(materiaalumnomensaje aux): base(aux){ 
            
        }
        
    }