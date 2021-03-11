 
using System;
using System.Collections.Generic;
    public class estudianteConexion<T> : ObjetoConexion<estudiante>
    {
       
        private static estudianteConexion<T> instance;
         public static estudianteConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new estudianteConexion<T>(new estudiante());
                return instance;
            }
        } 
        private estudianteConexion(estudiante aux): base(aux){ 
            
        }
        public List<estudiante> SearchestudiantesCurso( Int32 idcurso )
        {  
            string consulta =   $"select estudiante.* from estudiante where "+
                                $"estudiante.id in (select idestudiante from"+
                                $" (select count(id) as materias fro"+
                                $"m materia where idcurso = {idcurso}"+
                                $") as T1 CROSS JOIN (select idestudiante"+
                                $", count(idmateria) as materias_estudiante"+
                                $" from estudiantemateria join materia on "+
                                $"estudiantemateria.Idmateria = materia.id "+
                                $"where idciclolectivo = (select max(id) "+
                                $"from ciclolectivo) and idcurso = {idcurso}"+
                                $" group by idestudiante) as T2 where T1.materias"+
                                " = T2.materias_estudiante)";
            
            return (List<estudiante>)Conexion.consultaList<estudiante>(consulta);
        }
         public List<estudiante> SearchestudiantesMateria( Int32 idmateria  ,Int32 idciclolectivo = default(Int32))
        {  
             if(idciclolectivo == default(Int32)){
                idciclolectivo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            }
            string consulta =   $"select estudiante.* from estudiante where "+
                                $"estudiante.id in (select idestudiante from"+
                                $" estudiantemateria where idmateria = {idmateria} and idciclolectivo = {idciclolectivo})";
            
            return (List<estudiante>)Conexion.consultaList<estudiante>(consulta);
        }
    }
 