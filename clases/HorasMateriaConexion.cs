using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
    public class HorasMateriaConexion<T> : ObjetoConexion<horasmateria>
    {
       
        private static HorasMateriaConexion<T> instance;
          public static HorasMateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new HorasMateriaConexion<T>(new horasmateria());
                return instance;
            }
        } 
        private HorasMateriaConexion(horasmateria aux): base(aux){ 
            
        }
        public void InsertHoramateria(horasmateria obj){
            string consulta = "INSERT INTO horasmateria(numsemana, idmateria, idhoradia, activo) "+
                              "values (?numsemana, ?idmateria, ?idhoradia, 1) ";
            List<MySqlParameter> param = new List<MySqlParameter>();
            param.Add(new MySqlParameter ("numsemana" ,obj.numsemana ));
            param.Add(new MySqlParameter ("idmateria" ,obj.Idmateria ));
            param.Add(new MySqlParameter ("idhoradia" ,obj.Idhoradia ));
            Conexion.ConsultaParametros(consulta, param);
        }
        public void DeleteHoramateria(Int32 id){
            string consulta = "Update horasmateria "+
                              " set activo = 0 where id = ?id ";
            List<MySqlParameter> param = new List<MySqlParameter>();
            param.Add(new MySqlParameter ("id" ,id ));
            Conexion.ConsultaParametros(consulta, param);
        }
    }
 