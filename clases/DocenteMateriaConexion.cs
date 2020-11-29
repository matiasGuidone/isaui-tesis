 
    public class DocenteMateriaConexion<T> : ObjetoConexion<docentemateria>
    {
       
        private static DocenteMateriaConexion<T> instance;
         public static DocenteMateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new DocenteMateriaConexion<T>(new docentemateria());
                return instance;
            }
        } 
        private DocenteMateriaConexion(docentemateria aux): base(aux){ 
            
        }
        
        public void IncrementarCiclo(int idciclo){
            string consultainsert = "INSERT INTO docentemateria (iddocente,idmateria,idciclolectivo)"+
                                    $"(SELECT iddocente,idmateria, {idciclo} FROM docentemateria where idciclolectivo = ("+
                                    $" SELECT max(id) from ciclolectivo where id != {idciclo}))";
            Conexion.ConsultaParametros(consultainsert);
            
        }
    }
 