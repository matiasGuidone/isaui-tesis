 
    public class AlumnoMateriaConexion<T> : ObjetoConexion<alumnomateria>
    {
       
        private static AlumnoMateriaConexion<T> instance;
         public static AlumnoMateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AlumnoMateriaConexion<T>(new alumnomateria());
                return instance;
            }
        } 
        private AlumnoMateriaConexion(alumnomateria aux): base(aux){ 
            
        }
        
    }
 