 
using System;
using System.Collections.Generic;
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
        public List<evento> SearchAlumno(int idalumno){
            var consulta = $"SELECT evento.* FROM evento join alumnomateria on "+
            $"evento.Idmateria = alumnomateria.Idmateria where evento.tipo = 'materia' "+
            $"and alumnomateria.Idalumno = {idalumno} and YEAR(fechainicio) = YEAR(NOW())"+
            $" UNION SELECT evento.* FROM evento "+
            $"where evento.tipo <> 'materia' and YEAR(fechainicio) = YEAR(NOW())";

             return (List<evento>)Conexion.consultaList<evento>(consulta);
        }
    }
 