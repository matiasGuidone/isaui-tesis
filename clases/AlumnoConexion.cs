 
 using System;
using System.Collections.Generic;
    public class AlumnoConexion<T> : ObjetoConexion<alumno>
    {
       
        private static AlumnoConexion<T> instance;
         public static AlumnoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AlumnoConexion<T>(new alumno());
                return instance;
            }
        } 
        private AlumnoConexion(alumno aux): base(aux){ 
            
        }
        public List<alumno> SearchAlumnosCurso( Int32 idcurso )
        {  
            string consulta =   $"select alumno.* from alumno where "+
                                $"alumno.id in (select idalumno from"+
                                $" (select count(id) as materias fro"+
                                $"m materia where idcurso = {idcurso}"+
                                $") as T1 CROSS JOIN (select idalumno"+
                                $", count(idmateria) as materias_alumno"+
                                $" from alumnomateria join materia on "+
                                $"alumnomateria.Idmateria = materia.id "+
                                $"where idciclolectivo = (select max(id) "+
                                $"from ciclolectivo) and idcurso = {idcurso}"+
                                $" group by idalumno) as T2 where T1.materias"+
                                " = T2.materias_alumno)";
            
            return (List<alumno>)Conexion.consultaList<alumno>(consulta);
        }
    }
 