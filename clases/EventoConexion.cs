 
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
        public List<evento> Searchestudiante(int idestudiante){
            var consulta = $"SELECT evento.* FROM evento join estudiantemateria on "+
            $"evento.Idmateria = estudiantemateria.Idmateria where evento.tipo = 'materia' "+
            $"and estudiantemateria.Idestudiante = {idestudiante} and YEAR(fechainicio) = YEAR(NOW())"+
            $" UNION SELECT evento.* FROM evento "+
            $"where evento.tipo <> 'materia' and YEAR(fechainicio) = YEAR(NOW())";

             return (List<evento>)Conexion.consultaList<evento>(consulta);
        }
    }
 