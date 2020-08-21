public class EventoConexion<T> : ObjetoConexion<evento>
    {
       
        private static EventoConexion<T> instance;
         public static EventoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new EventoConexion<T>(new evento());
                return instance;
            }
        } 
        private EventoConexion(evento aux): base(aux){ 
            
        }
        
    }
 