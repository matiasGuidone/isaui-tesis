 using System;
using System.Collections.Generic;

using MySql.Data.MySqlClient;
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
        public void DeleteByCurso(Int32 idcurso){
            string consulta =   $"DELETE FROM alumnomateria where idalumno "+
                                $"in (select idalumno from (select count(id)"+
                                $" as materias from materia where idcurso = ?idcurso )"+
                                $" as T1 CROSS JOIN (select idalumno, count(idmateria)"+
                                $" as materias_alumno from alumnomateria join materia on"+
                                $" alumnomateria.Idmateria = materia.id where idciclolectivo"+
                                $" = (select max(id) from ciclolectivo) and idcurso = ?idcurso"+
                                $" group by idalumno) as T2 where T1.materias = T2.materias_alumno)"+
                                $" and idmateria in (select id from materia where idcurso = ?idcurso )";
                                
            List<MySqlParameter> parametro = new List<MySqlParameter>();
                parametro.Add(new MySqlParameter("idcurso", idcurso));
                Conexion.ConsultaParametros(consulta, parametro);
        }
        
        
    }
 