using MySql.Data.MySqlClient;
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
            
             con="SELECT m.nombre as materia,  CONCAT( cv.nombre,', ' ,cv.apellido) as postulante, cv.numerodoc as dni,"+
                    $" IFNULL(cc.puntaje,0) as puntaje, IFNULL(cc.prioridad, 0) as prioridad, cv.id as idcv "+
                    "FROM curriculum cv, curriculumconvocatoria cc, convocatoria c, materia m "+
                    $"WHERE cv.Id = cc.Idcurriculum AND c.Id= cc.Idconvocatoria AND m.Id = c.Idmateria AND c.Id={idconvocatoria} ORDER by cc.prioridad DESC";
            var formulas = FormulaConexion<formula>.Instance.SearchAll(null, " AND estado = 1 ");
            var lista =(List<ordenmerito>)Conexion.consultaList<ordenmerito>(con);
            for (int i=0; i<lista.Count;i++)
            {
                var puntos = 0.0;
                foreach(var f in formulas){
                    var aux = Conexion.consultaDataTable(f.Script.Replace("{{id}}",lista[i].idcv.ToString()));
                    if(aux.Tables[0].Rows.Count>0){
                        puntos += Convert.ToDouble(aux.Tables[0].Rows[0]["puntos"]);
                    }
                }
                lista[i].puntaje = puntos;
            }
           
            return lista;
        }

        public void actualizarConvocatoria(curriculumconvocatoria cvcon){
            var consulta = "UPDATE curriculumconvocatoria set puntaje = ?puntaje , prioridad = ?prioridad where idconvocatoria = ?idconvocatoria and idcurriculum = ?idcurriculum ";
            List<MySqlParameter> param = new List<MySqlParameter>();
            param.Add(new MySqlParameter ("puntaje" ,cvcon.Puntaje ));
            param.Add(new MySqlParameter ("prioridad" ,cvcon.Prioridad ));
            param.Add(new MySqlParameter ("idconvocatoria" ,cvcon.Idconvocatoria ));
            param.Add(new MySqlParameter ("idcurriculum" ,cvcon.Idcurriculum ));
            Conexion.ConsultaParametros(consulta, param);
        }
        public List<currcov> getDatosConvocatoriasCv(Int32 idcv){

            string consulta =$"SELECT materia.nombre, convocatoria.descripcion, convocatoria.fechafin," +
                             " curriculumconvocatoria.Idcurriculum, curriculumconvocat" +
                             "oria.Idconvocatoria FROM ((convocatoria INNER JOIN curri" +
                             "culumconvocatoria ON convocatoria.Id = curriculumconvocato"+
                             "ria.Idconvocatoria ) INNER JOIN curriculum ON curriculum.Id "+
                             "= curriculumconvocatoria.Idcurriculum) JOIN materia on convocatoria.Idm"+
                             "ateria = materia.id WHERE curriculumconvo"+
                             $"catoria.Idconvocatoria <> 0 and curriculum.Id = {idcv}";

            return (List<currcov>)Conexion.consultaList<currcov>(consulta);
        }
    }