 
    public class MateriaestudiantemensajeConexion<T> : ObjetoConexion<materiaestudiantemensaje>
    {
       
        private static MateriaestudiantemensajeConexion<T> instance;
         public static MateriaestudiantemensajeConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MateriaestudiantemensajeConexion<T>(new materiaestudiantemensaje());
                return instance;
            }
        } 
        private MateriaestudiantemensajeConexion(materiaestudiantemensaje aux): base(aux){ 
            
        }
        
    }