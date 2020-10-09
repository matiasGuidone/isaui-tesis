  
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

        public List<notarepo> SerchNotaAlumnos(int idalumno, int idmateria)
        {
            var consultaSql="";
            
            consultaSql=$"SELECT M.nombre, E.tipo, CA.nota "; //agregar ciclo lectivo, saca la mayuscula de nota(DB)
            consultaSql += $"FROM materia M, examen E, calificacionalumno CA ";
            consultaSql += $"WHERE M.Id = E.Idmateria AND E.Id=CA.Idexamen ";
            consultaSql += $"AND CA.Idalumno= {idalumno} AND E.idmateria={idmateria}";
            // materia y notas de alumno selecionado
            // SELECT M.nombre, E.tipo, CA.nota FROM materia M, examen E, calificacionalumno CA WHERE M.Id = E.Idmateria AND E.Id=CA.Idexamen AND CA.Idalumno= 1
            
        
            return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql); 
        }

/*  public List<notarepo> SerchTipoEvaAlumnos(int idalumno, int idmateria)
        {
            var consultaSql="";
            
            consultaSql=$"SELECT E.tipo "; 
            consultaSql += $"FROM materia M, examen E, calificacionalumno CA ";
            consultaSql += $"WHERE M.Id = E.Idmateria AND E.Id=CA.Idexamen ";
            consultaSql += $"AND CA.Idalumno= {idalumno} AND E.idmateria={idmateria}";
        
            return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql); 
        }

         public List<notarepo> SerchNotaAlumnos2(int idalumno, int idmateria)
        {
            var consultaSql="";
            
            consultaSql=$"SELECT CA.nota "; 
            consultaSql += $"FROM materia M, examen E, calificacionalumno CA ";
            consultaSql += $"WHERE M.Id = E.Idmateria AND E.Id=CA.Idexamen ";
            consultaSql += $"AND CA.Idalumno= {idalumno} AND E.idmateria={idmateria}";
        
            return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql); 
        }

        public List<notarepo> SerchMateriaAlumnos(int idalumno, int idmateria)
        {
            var consultaSql="";
            
            consultaSql=$"SELECT M.nombre "; //agregar ciclo lectivo, saca la mayuscula de nota(DB)
            consultaSql += $"FROM materia M, examen E, calificacionalumno CA ";
            consultaSql += $"WHERE M.Id = E.Idmateria AND E.Id=CA.Idexamen ";
            consultaSql += $"AND CA.Idalumno= {idalumno} AND E.idmateria={idmateria}";
            
        
            return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql); 
        } */


       /*  public List<notarepo> SerchNotaAlumnos2(int idalumno, int idmateria)
        {
            
             var consultaSql2="";
            // promedio de cada materia por alumno
            //SELECT AVG(CA.Nota) FROM calificacionalumno CA, examen E WHERE CA.Idexamen=E.Id AND E.tipo="parcial" AND E.Idmateria=2 AND CA.Idalumno=1
            consultaSql2 =$"SELECT AVG(CA.Nota) ";
            consultaSql2 +=$"FROM calificacionalumno CA, examen E ";
            consultaSql2 +=$"WHERE CA.Idexamen=E.Id AND E.tipo='parcial' AND E.Idmateria={idmateria} AND CA.Idalumno={idalumno}";
            return (List<notarepo>)Conexion.consultaList<notarepo>(consultaSql2); 
        } */
    }