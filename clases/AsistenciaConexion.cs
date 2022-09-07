 
 using System;
using System.Collections.Generic;
    public class AsistenciaConexion<T> : ObjetoConexion<asistencia>
    {
       
        private static AsistenciaConexion<T> instance;
         public static AsistenciaConexion<T> Instance
        {
            get
            {
                if (instance == null)
                    instance = new AsistenciaConexion<T>(new asistencia());
                return instance;
            }
        } 
        private AsistenciaConexion(asistencia aux): base(aux){ 
            
        }
        public List<asistencia> SearchPorMateria( Int32 idmateria , string fecha = null )
        {  
            string fechstr = "CURDATE()";
            if(fecha != null){
                string year = fecha.Split('/')[2];
                string month = fecha.Split('/')[1];
                string day = fecha.Split('/')[0];
                fechstr = $" '{year}-{month}-{day}' ";
            }
            string consulta =   $"select asistencia.* from asistencia where "+
                                $"asistencia.idhoramateria in (select id from"+
                                $" horasmateria where idmateria = {idmateria})"+
                                $" and asistencia.fecha > {fechstr} - INTERVAL 7 DAY";
            
            return (List<asistencia>)Conexion.consultaList<asistencia>(consulta);
        }

        public List<asistenciarepo> ReporteAsistencias( DateTime fechaDesde = default(DateTime),
                                                DateTime fechaHasta = default(DateTime),
                                                Int32 idcurso = default(Int32), 
                                                 Int32 idmateria = default(Int32),
                                                string nombreapellido = null,
                                                Boolean totales = false,
                                                Int32 idestudiante = default(Int32)){
            var estudiante = "";
            var consulta = "";
            if(fechaDesde == default(DateTime)){fechaDesde = System.DateTime.Now.AddDays(-8); }
            if(fechaHasta == default(DateTime)){fechaHasta = System.DateTime.Now; }
            if(totales){estudiante = "estudiante.Id,"; 
                        consulta += "SELECT T3.estudiante, 'Todas' as Materia, Sum(T3.ModulosPresente) as ModulosPresente, Sum(T3.CantidadModulos) as CantidadModulos, estadoasistencias from ( ";}

            consulta += $"select {estudiante} concat(estudiante.apellido,', ',estudiante.nombre) as estudiante, estudiantemateria.estadoasistencias, "+
                $"materia.nombre as Materia, count(asistencia.Id) as ModulosPresente , "+
                $"modulos as CantidadModulos from asistencia "+
                $"join horasmateria on asistencia.idhoramateria = horasmateria.id "+
                $"JOIN estudiante on asistencia.idestudiante = estudiante.id "+
                $"join materia on horasmateria.idmateria = materia.Id "+
                $"join estudiantemateria on estudiantemateria.idmateria = materia.Id and estudiantemateria.idestudiante = estudiante.id "+
                $"JOIN ( SELECT idmateria, Sum(modulos) as modulos from ( SELECT horasmateria.idmateria, COUNT(horasmateria.id)*Cnt AS modulos "+
                $"FROM horasmateria,(SELECT DAYOFWEEK(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY))-1 as DIA, " +
                $"COUNT(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY)) as Cnt "+
                $"FROM ( SELECT @row := @row+1 AS row FROM INFORMATION_SCHEMA.COLUMNS, "+
                $"(SELECT @row := 0) t ) T WHERE DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY) "+
                $"BETWEEN '{fechaDesde.ToString("yyyy-MM-dd")}' AND '{fechaHasta.ToString("yyyy-MM-dd")+" 23:59:59" }' "+
                $"and DATE_FORMAT(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY) , '%Y-%m-%d') NOT IN (SELECT DATE_FORMAT(evento.fechainicio, '%Y-%m-%d') from evento where "+
                $"evento.tipo like 'feriado' and evento.fechainicio BETWEEN '{fechaDesde.ToString("yyyy-MM-dd")}' AND"+
                $" '{fechaHasta.ToString("yyyy-MM-dd")+" 23:59:59" }' ) "+
                $"GROUP BY DAYOFWEEK(DATE_ADD('{fechaDesde.ToString("yyyy-MM-dd")}', INTERVAL row DAY))) T1 "+
                $"WHERE horasmateria.activo = 1 and horasmateria.numsemana = T1.DIA group by idmateria , horas"+
                $"materia.numsemana) T4 group by idmateria ) T2 "+
                $"ON materia.Id = T2.idmateria "+
                $"WHERE asistencia.fecha BETWEEN '{fechaDesde.ToString("yyyy-MM-dd")}' and '{fechaHasta.ToString("yyyy-MM-dd")+" 23:59:59" }' ";
           
            if (nombreapellido != null){consulta += $" and concat(estudiante.apellido,', ',estudiante.nombre) LIKE '%{nombreapellido}%' "; }
            if (idestudiante !=  default(Int32)){consulta += $" and estudiante.id = {idestudiante} ";}
            if (idmateria !=  default(Int32)){consulta += $" and materia.Id = {idmateria} "; }
            if (idcurso != default(Int32)){consulta += $" and estudiante.Id IN "+ 
                                                    $"(select estudiante.Id from estudiante where "+
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
                                                    " = T2.materias_estudiante))";}
                  
            consulta +=" group by asistencia.idestudiante, materia.Id ";
            if(totales){consulta += ") T3 group by T3.Id ";}
            return (List<asistenciarepo>)Conexion.consultaList<asistenciarepo>(consulta);
        }
    }