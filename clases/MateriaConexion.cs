 
  
using System;
using System.Collections.Generic;
    public class MateriaConexion<T> : ObjetoConexion<materia>
    {
       
        private static MateriaConexion<T> instance;
         public static MateriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new MateriaConexion<T>(new materia());
                return instance;
            }
        } 
        private MateriaConexion(materia aux): base(aux){ 
            
        }
         public List<materia> SearchByestudiante( Int32 idestudiante ,Int32 idciclolectivo = default(Int32))
        {  
            if(idciclolectivo == default(Int32)){
                idciclolectivo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            }
            
            string consulta =   $"select materia.* from materia where "+
                                $"materia.id in (select idmateria from"+
                                $" estudiantemateria where idestudiante = {idestudiante} and idciclolectivo = {idciclolectivo}) ";
            
            return (List<materia>)Conexion.consultaList<materia>(consulta);
        }
         public List<materia> SearchByDocente( Int32 iddocente,Int32 idciclolectivo = default(Int32) )
        {  
            if(idciclolectivo == default(Int32)){
                idciclolectivo = CicloLectivoConexion<ciclolectivo>.Instance.getCicloLectivo().Id;
            }
            string consulta =   $"select materia.* from materia where "+
                                $"materia.id in (select idmateria from"+
                                $" docentemateria where iddocente = {iddocente} and idciclolectivo = {idciclolectivo})";
            
            return (List<materia>)Conexion.consultaList<materia>(consulta);
        }
        
         public List<materia> SearchIds( string ids)
        {  
            string consulta =   $"select materia.* from materia where "+
                                $"materia.id in ("+ids+")"; 
            
            return (List<materia>)Conexion.consultaList<materia>(consulta);
        }
    }