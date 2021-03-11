 using System;
using System.Collections.Generic;

using MySql.Data.MySqlClient;
    public class estudianteMateriaConexion<T> : ObjetoConexion<estudiantemateria>
    {
       
        private static estudianteMateriaConexion<T> instance;
         public static estudianteMateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new estudianteMateriaConexion<T>(new estudiantemateria());
                return instance;
            }
        } 
        private estudianteMateriaConexion(estudiantemateria aux): base(aux){ 
            
        }
        public void DeleteByCurso(Int32 idcurso){
            string consulta =   $"DELETE FROM estudiantemateria where idestudiante "+
                                $"in (select idestudiante from (select count(id)"+
                                $" as materias from materia where idcurso = ?idcurso )"+
                                $" as T1 CROSS JOIN (select idestudiante, count(idmateria)"+
                                $" as materias_estudiante from estudiantemateria join materia on"+
                                $" estudiantemateria.Idmateria = materia.id where idciclolectivo"+
                                $" = (select max(id) from ciclolectivo) and idcurso = ?idcurso"+
                                $" group by idestudiante) as T2 where T1.materias = T2.materias_estudiante)"+
                                $" and idmateria in (select id from materia where idcurso = ?idcurso )";
                                
            List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter("idcurso", idcurso));
                Conexion.ConsultaParametros(consulta, parametro);
        }
        
        
    }
 