  
using System;
using System.Collections.Generic;
    public class CalificacionalumnoConexion<T> : ObjetoConexion<calificacionalumno>
    {
       
        private static CalificacionalumnoConexion<T> instance;
         public static CalificacionalumnoConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CalificacionalumnoConexion<T>(new calificacionalumno());
                return instance;
            }
        } 
        private CalificacionalumnoConexion(calificacionalumno aux): base(aux){ 
            
        }
        public List<calificacionalumno> SearchExamenes( string[] arrayIds ){

            string d ="";
            for (int i=1; i< arrayIds.Length; i++){ d += arrayIds[i]+",";}
            d = d.Substring(0,d.Length-1);
            string consulta =   $"select calificacionalumno.* from calificacionalumno where "+
                                $" idexamen in ({d}) ";
            
            return (List<calificacionalumno>)Conexion.consultaList<calificacionalumno>(consulta);
        }
    }