 using System;
using System.Collections.Generic;
    public class CurriculumconvocatoriaConexion<T> : ObjetoConexion<curriculumconvocatoria>
    {
       
        private static CurriculumconvocatoriaConexion<T> instance;
         public static CurriculumconvocatoriaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new CurriculumconvocatoriaConexion<T>(new curriculumconvocatoria());
                return instance;
            }
        } 
        private CurriculumconvocatoriaConexion(curriculumconvocatoria aux): base(aux){ 
            
        }
        
        public List<ordenmerito> serchCv(int idconvocatoria)
        {
            var con=""; //agregar materia
             con="SELECT m.nombre as materia,  CONCAT( cv.nombre,', ' ,cv.apellido) "+
                    "as postulante, IFNULL(cc.puntaje,0) as puntaje, IFNULL(cc.prioridad, 0) as prioridad "+
                    "FROM curriculum cv, curriculumconvocatoria cc, convocatoria c, materia m "+
                    $"WHERE cv.Id = cc.Idcurriculum AND c.Id= cc.Idconvocatoria AND m.Id = c.Idmateria AND c.Id={idconvocatoria} ORDER by cc.prioridad DESC";
            return (List<ordenmerito>)Conexion.consultaList<ordenmerito>(con);
        }

    }