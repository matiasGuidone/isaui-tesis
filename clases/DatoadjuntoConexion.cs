 
    public class DatoadjuntoConexion<T> : ObjetoConexion<datoadjunto>
    {
       
        private static DatoadjuntoConexion<T> instance;
         public static DatoadjuntoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DatoadjuntoConexion<T>(new datoadjunto());
                return instance;
            }
        } 
        private DatoadjuntoConexion(datoadjunto aux): base(aux){ 
            
        }
        
    }
 