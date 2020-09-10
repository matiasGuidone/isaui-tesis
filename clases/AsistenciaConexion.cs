 
 using System;
using System.Collections.Generic;
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
        public List<asistencia> SearchPorMateria( Int32 idmateria )
        {  
            string consulta =   $"select asistencia.* from asistencia where "+
                                $"asistencia.idhoramateria in (select id from"+
                                $" horasmateria where idmateria = {idmateria})"+
                                $" and asistencia.fecha > CURDATE() - INTERVAL 7 DAY";
            
            return (List<asistencia>)Conexion.consultaList<asistencia>(consulta);
        }
    }